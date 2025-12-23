import React from "react";
import { SimpleGrid, Stack, Text } from "@mantine/core";
import { MapReservedColorButtons } from "./reserved-color-button";
import { RESERVED_COLORS_GRID as GRID_SETTINGS } from "../constants";

type Props = {
  reserved: ReservedColor[];
  setColor: (color: string) => void;
};

export function ReservedColorsBlock({ reserved, setColor }: Props) {
  return (
    <Stack gap="sm">
      <Text fw="bold">Reserved colors</Text>
      <SimpleGrid cols={GRID_SETTINGS} spacing="sm">
        <MapReservedColorButtons reserved={reserved} setColor={setColor} />
      </SimpleGrid>
    </Stack>
  );
}
