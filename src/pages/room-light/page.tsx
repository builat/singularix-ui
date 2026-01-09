import React, { useState, useEffect } from "react";
import { Box, SimpleGrid } from "@mantine/core";
import { LedManager } from "./service";
import { PageTitle, ReservedColorsBlock } from "./components";

import {
  PAGE_GRID as GRID_SETTINGS,
  reserved_colors as reserved,
  STATUS_POLL_INTERVAL,
} from "./constants";
import { AckToasts } from "@/src/shared/sse";
import LogWindow from "./components/log-window";
const ledManager = LedManager.getInstance();

export function RoomLightPage() {
  const [connected, setConnected] = useState(false);
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

  return (
    <Box>
      <AckToasts />
      <PageTitle connected={connected} />
      <SimpleGrid cols={GRID_SETTINGS} spacing="md" verticalSpacing="md">
        <ReservedColorsBlock
          reserved={reserved}
          setRainbow={ledManager.setRainbow}
          setColor={ledManager.setLedColor}
        />
      </SimpleGrid>
      <LogWindow />
    </Box>
  );
}
