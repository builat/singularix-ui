import { useEffect } from "react";
import { useUnit } from "effector-react";
import {
  $sseConnected,
  $events,
  $lastAck,
  startSse,
  stopSse,
} from "@/src/models/sse";

export function useSse(url: string) {
  const [connected, events, lastAck, start, stop] = useUnit([
    $sseConnected,
    $events,
    $lastAck,
    startSse,
    stopSse,
  ]);

  useEffect(() => {
    start(url);
    return () => stop();
  }, [url, start, stop]);

  return { connected, events, lastAck };
}
