import React, { useState, useEffect } from "react";
import { Box, SimpleGrid } from "@mantine/core";

import EventsPanel from "./components/ble-status-card";

export function StatusPage() {
  return (
    <Box>
      <SimpleGrid cols={1} spacing="md" verticalSpacing="md">
        <EventsPanel />
      </SimpleGrid>
    </Box>
  );
}
