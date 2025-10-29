import React, { JSX, PropsWithChildren, ReactNode } from "react";
import { Card, Group, Stack, Text, Title } from "@mantine/core";

type Props = PropsWithChildren<{
  title: string;
  TopExtraElement?: JSX.Element;
  comment?: ReactNode;
}>;

export function SimpleCard({
  title,
  children,
  TopExtraElement,
  comment,
}: Props): React.ReactElement {
  return (
    <Card withBorder shadow="sm" p="lg">
      <Stack gap="md">
        <Group justify="space-between" align="center">
          <Title order={2}>{title}</Title>
          {TopExtraElement ? TopExtraElement : null}
        </Group>
        {children}
        <Text c="dimmed" size="sm">
          {comment}
        </Text>
      </Stack>
    </Card>
  );
}
