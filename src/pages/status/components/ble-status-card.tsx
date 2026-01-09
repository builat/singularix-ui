import React from "react";
import { Badge, Card, Stack, Text } from "@mantine/core";
import { useSse } from "@/src/shared/hooks/useSse";
import { API_BASE_URL } from "@/src/config";
import { RawNotification } from "@/src/shared/sse/protocol-parser";

function ConnectionStatus({ connected }: { connected: boolean }) {
  return (
    <Badge color={connected ? "teal" : "red"}>
      {connected ? "SSE connected" : "SSE reconnecting…"}
    </Badge>
  );
}

function LogBox({ events }: { events: RawNotification[] }) {
  if (!events.length) {
    return (
      <Text c="dimmed" size="xs">
        No events yet…
      </Text>
    );
  }

  return (
    <pre style={{ maxHeight: 240, overflow: "auto", margin: 0 }}>
      {events.map((x, i) => (
        // i as a key used here is acceptable since logs are append-only
        <div key={i}>{JSON.stringify(x)} </div>
      ))}
    </pre>
  );
}

export default function EventsPanel() {
  const { connected, events } = useSse(`${API_BASE_URL}/led/events`);

  return (
    <Card withBorder shadow="sm" p="md">
      <Stack gap="xs">
        <ConnectionStatus connected={connected} />
        <LogBox events={events} />
      </Stack>
    </Card>
  );
}
