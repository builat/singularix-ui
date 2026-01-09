import { createDomain, sample } from "effector";

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
  .createStore<string | null>(null)
  .on(messageReceived, (_, m) => m);

export const $events = sse
  .createStore<string[]>([])
  .on(messageReceived, (list, m) => [m, ...list].slice(0, 200))
  .reset(stopSse);

// Optional: keep last ACK only
export const $lastAck = sse
  .createStore<string | null>(null)
  .on(customEventReceived, (prev, e) => (e.type === "ack" ? e.data : prev));

// Backoff state
const backoffReset = sse.createEvent();
const backoffBump = sse.createEvent();
export const $backoffMs = sse
  .createStore(1000) // start at 1s
  .on(backoffReset, () => 1000)
  .on(backoffBump, (ms) => Math.min(ms * 2, 15000));

// Effect that opens the EventSource and manages lifecycle
export const startSseFx = sse.createEffect(async (url: string) => {
  // We manage reconnection from the outside; this effect opens once.
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

    // listen to custom event types (e.g., server yields .name("ack"))
    const onAck = (ev: MessageEvent) =>
      customEventReceived({ type: "ack", data: ev.data });
    es.addEventListener("ack", onAck);

    es.onerror = (err) => {
      // Close and mark error; the reconnection policy lives outside this effect
      es.close();
      if (!closed) errored(err ?? new Error("sse error"));
      resolve(); // end this effect call so outer logic can schedule a retry
    };

    // Cleanup when stopSse is called while the effect is active
    const unsub = stopSse.watch(() => {
      closed = true;
      es.close();
      resolve();
    });

    // Also cleanup when completed for any reason
    const teardown = () => {
      es.removeEventListener("ack", onAck);
      unsub();
    };
    // When effect finishes (resolve()), run teardown
    // (We rely on the fact that we resolve exactly once in any path)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
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
