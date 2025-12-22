import React from "react";
import { Group, Button } from "@mantine/core";
import { IconSend2 } from "@tabler/icons-react";

type Props = {
  connected: boolean;
  busy: boolean;
  sendColor: () => Promise<void>;
};

export function SetColorBtn({ connected, busy, sendColor }: Props) {
  return (
    <Group justify="flex-end">
      <Button
        onClick={sendColor}
        loading={busy}
        leftSection={<IconSend2 size={18} />}
        disabled={!connected}
      >
        Send color
      </Button>
    </Group>
  );
}
