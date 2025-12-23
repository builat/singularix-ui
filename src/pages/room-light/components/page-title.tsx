import React from "react";
import { Flex, Title } from "@mantine/core";
import { LedConnectionBadge } from ".";
type Props = {
  connected: boolean;
};

export function PageTitle({ connected }: Props) {
  return (
    <Flex
      gap="xs"
      justify="flex-start"
      align="center"
      direction="row"
      wrap="wrap"
      mb="md"
    >
      <LedConnectionBadge connected={connected} />
      <Title order={2}>LED Lights</Title>
    </Flex>
  );
}
