import React, { useState, useEffect } from "react";
import { SimpleCard } from "@/src/shared";
import { LedManager } from "../service/led-api-connector";
import { ColorPicker, SetColorBtn } from ".";
import { Badge, Group, Stack } from "@mantine/core";

const ledManager = LedManager.getInstance();

export function LedRoomCard({ connected }: { connected: boolean }) {
  const [color, setColor] = useState("#FF0000");
  const [busy, setBusy] = useState(false);

  async function sendColor() {
    setBusy(true);
    try {
      await ledManager.setLedColor(color);
    } catch (e) {
      console.error(e);
    } finally {
      setBusy(false);
    }
  }

  return (
    <SimpleCard title="Custom">
      <Stack gap="sm">
        <Group justify="center">
          <ColorPicker color={color} setColor={setColor} />
          <SetColorBtn
            connected={connected}
            busy={busy}
            sendColor={sendColor}
          />
        </Group>
        <Group justify="left"></Group>
      </Stack>
    </SimpleCard>
  );
}
