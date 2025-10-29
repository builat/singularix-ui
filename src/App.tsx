import React from "react";
import { Container, Group, Stack, Title } from "@mantine/core";
import { LedRoomCard } from "./led-manager/led-card";

export default function App() {
  return (
    <Container size="sm" py="lg">
      <Stack gap="lg">
        <Group justify="space-between" align="center">
          <Title order={2}>Room light manager</Title>
        </Group>
        <LedRoomCard />
      </Stack>
    </Container>
  );
}
