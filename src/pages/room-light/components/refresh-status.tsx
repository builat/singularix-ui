import { Tooltip, ActionIcon } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import React from "react";

type Props = {
  onClick: () => Promise<void>;
};

export function RefreshStatus({ onClick }: Props) {
  return (
    <Tooltip label="refresh status">
      <ActionIcon variant="subtle" onClick={onClick}>
        <IconRefresh size={18} />
      </ActionIcon>
    </Tooltip>
  );
}
