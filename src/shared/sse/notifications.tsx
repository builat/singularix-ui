import { useEffect } from "react";
import { useUnit } from "effector-react";
import { $lastEvent } from "@/src/models/sse";
import { notifications } from "@mantine/notifications";
import { parseSseEvent } from "./protocol-parser";

export function AckToasts() {
  const last = useUnit($lastEvent);

  useEffect(() => {
    if (!last) return;

    try {
      const sseMsg = parseSseEvent(last);
      if (sseMsg?.status) {
        notifications.show({
          title: "[!] BLE",
          message: `Error: ${sseMsg?.command} ${
            sseMsg?.detail ?? "Command failed"
          }`,
          color: "red",
        });
      }
    } catch {}
  }, [last]);

  return null;
}
