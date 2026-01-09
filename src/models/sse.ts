import { createDomain, sample } from "effector";
import { RawNotification } from "../shared/sse/protocol-parser";

const sse = createDomain("sse");

// Inputs / controls
export const startSse = sse.createEvent<string>(); // url
export const stopSse = sse.createEvent();

// Internal events
export const messageReceived = sse.createEvent<string>();
export const customEventReceived = sse.createEvent<{
  type: string;
  data: string;
}>();
export const opened = sse.createEvent();
export const errored = sse.createEvent<unknown>();

// Connection status
export const $sseConnected = sse
  .createStore(false)
  .on(opened, () => true)
  .on(errored, () => false)
  .on(stopSse, () => false);

// Last message + rolling buffer
export const $lastEvent = sse
  .createStore<RawNotification | null>(null)
  .on(messageReceived, (_, m) => JSON.parse(m));

export const $events = sse
  .createStore<RawNotification[]>([])
  .on(messageReceived, (list, m) => {
    const parsedEv = JSON.parse(m);
    list.unshift(parsedEv);
    const cleanList = list.slice(0, 20); // keep last 20
    return cleanList;
  })
  .reset(stopSse);

export const $lastAck = sse
  .createStore<RawNotification | null>(null)
  .on(customEventReceived, (prev, e) =>
    e.type === "ack" ? JSON.parse(e.data) : prev
  );

// Backoff state
const backoffReset = sse.createEvent();
const backoffBump = sse.createEvent();
export const $backoffMs = sse
  .createStore(1000)
  .on(backoffReset, () => 1000)
  .on(backoffBump, (ms) => Math.min(ms * 2, 15000));

export const startSseFx = sse.createEffect(async (url: string) => {
  return new Promise<void>((resolve) => {
    let closed = false;
    const es = new EventSource(url, { withCredentials: false });

    es.onopen = () => {
      opened();
      backoffReset();
    };

    es.onmessage = (ev) => {
      messageReceived(ev.data);
    };

    const onAck = (ev: MessageEvent) =>
      customEventReceived({ type: "ack", data: ev.data });
    es.addEventListener("ack", onAck);

    es.onerror = (err) => {
      es.close();
      if (!closed) errored(err ?? new Error("sse error"));
      resolve(); // end this effect call so outer logic can schedule a retry
    };

    const unsub = stopSse.watch(() => {
      closed = true;
      es.close();
      resolve();
    });

    const teardown = () => {
      es.removeEventListener("ack", onAck);
      unsub();
    };
    Promise.resolve().then(() => teardown);
  });
});

// Orchestrate reconnection with backoff
const retryTick = sse.createEvent<{ url: string }>();

// When startSse(url) requested, kick off the first attempt
sample({
  clock: startSse,
  fn: (url) => ({ url }),
  target: retryTick,
});

// After delay effect completes, bump backoff and try again
backoffBump.watch(() => {}); // placeholder so ESLint is quiet

sample({
  clock: errored, // bump on each error
  target: backoffBump,
});

// Attempt to (re)connect whenever `retryTick` fires
sample({
  clock: retryTick,
  fn: ({ url }) => url,
  target: startSseFx,
});

// Reset backoff when we open successfully
sample({
  clock: opened,
  target: backoffReset,
});
