import React, { useState, useEffect } from "react";
import { SimpleCard } from "@/src/shared";
import { LedManager } from "../service/led-api-connector";
import { ColorPicker, RefreshStatus, SetColorBtn } from ".";
import { STATUS_POLL_INTERVAL } from "../service/static";
import { Badge, Group, Stack } from "@mantine/core";

const ledManager = LedManager.getInstance();

export function LedRoomCard() {
  const [connected, setConnected] = useState(false);
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

  useEffect(() => {
    let mounted = true;
    const tick = async () => {
      try {
        const isConnected = await ledManager.getLedStatus();
        if (mounted) setConnected(isConnected);
      } catch {}
    };
    const id = setInterval(tick, STATUS_POLL_INTERVAL);
    tick();
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  async function refreshStatus(): Promise<void> {
    const status = await ledManager.getLedStatus();
    setConnected(status);
  }

  return (
    <SimpleCard
      title="Select color for room led"
      TopExtraElement={<RefreshStatus onClick={refreshStatus} />}
    >
      <Stack gap="md">
        <Group justify="center">
          <ColorPicker color={color} setColor={setColor} />
          <SetColorBtn
            connected={connected}
            busy={busy}
            sendColor={sendColor}
          />
        </Group>
        <Group justify="left">
          <Badge variant="light" color={connected ? "teal" : "red"} size="lg">
            Status: {connected ? "Connected" : "Disconnected"}
          </Badge>
        </Group>
      </Stack>
    </SimpleCard>
  );
}
