import React from "react";
import { Box, Tooltip } from "@mantine/core";
import { IconPlugConnected, IconPlugOff } from "@tabler/icons-react";

type Props = {
  connected: boolean;
};

export function LedConnectionBadge({ connected }: Props) {
  return (
    <Box>
      <Tooltip label={connected ? "LED Connected" : "LED Disconnected"}>
        {connected ? (
          <IconPlugConnected size={18} color="teal" />
        ) : (
          <IconPlugOff size={18} color="red" />
        )}
      </Tooltip>
    </Box>
  );
}
