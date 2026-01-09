import React from "react";
import { SimpleGrid, Stack, Text } from "@mantine/core";
import {
  MapReservedColorButtons,
  RainbowButton,
} from "./reserved-color-button";
import { RESERVED_COLORS_GRID as GRID_SETTINGS } from "../constants";
import { ColorPicker } from "./color-picker";

type Props = {
  reserved: ReservedColor[];
  setColor: (color: string) => void;
  setRainbow: () => Promise<void>;
};

export function ReservedColorsBlock({ reserved, setColor, setRainbow }: Props) {
  return (
    <Stack gap="sm">
      <Text fw="bold">Reserved colors</Text>
      <SimpleGrid cols={GRID_SETTINGS} spacing="sm">
        <RainbowButton setRainbow={setRainbow} />
        <ColorPicker setColor={setColor} />
        <MapReservedColorButtons reserved={reserved} setColor={setColor} />
      </SimpleGrid>
    </Stack>
  );
}
