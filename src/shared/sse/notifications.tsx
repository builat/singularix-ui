import { useEffect } from "react";
import { useUnit } from "effector-react";
import { $lastAck } from "@/src/models/sse";
import { notifications } from "@mantine/notifications";

export function AckToasts() {
  const lastAck = useUnit($lastAck);
  useEffect(() => {
    if (lastAck)
      notifications.show({ title: "ACK", message: lastAck, color: "teal" });
  }, [lastAck]);
  return null;
}
