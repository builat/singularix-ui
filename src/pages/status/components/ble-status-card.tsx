import React from "react";
import { Badge, Card, Stack, Text } from "@mantine/core";
import { useSse } from "@/src/shared/hooks/useSse";
import { API_BASE_URL } from "@/src/config";

export default function EventsPanel() {
  const { connected, events, lastAck } = useSse(`${API_BASE_URL}/led/events`);

  return (
    <Card withBorder shadow="sm" p="md">
      <Stack gap="xs">
        <Badge color={connected ? "teal" : "red"}>
          {connected ? "SSE connected" : "SSE reconnecting…"}
        </Badge>
        {lastAck && <Text c="teal">Last ACK: {lastAck}</Text>}
        <pre style={{ maxHeight: 240, overflow: "auto", margin: 0 }}>
          {events.join("\n") || "No events yet…"}
        </pre>
      </Stack>
    </Card>
  );
}
