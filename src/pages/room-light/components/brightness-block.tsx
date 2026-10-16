import React, { useState } from "react";
import { Slider, Stack, Text } from "@mantine/core";
import { BRIGHTNESS } from "../constants";

type Props = {
  setBrightness: (brightness: number) => Promise<void>;
};

const formatLabel = (value: number) =>
  `${Math.round((value / BRIGHTNESS.max) * 100)}%`;

const quarter = BRIGHTNESS.max / 4;
const marks = [0, quarter, quarter * 2, quarter * 3, BRIGHTNESS.max].map(
  (value, i) => ({ value: Math.round(value), label: `${i * 25}%` })
);

export function BrightnessBlock({ setBrightness }: Props) {
  const [brightness, setInternalBrightness] = useState(BRIGHTNESS.default);

  return (
    <Stack gap="sm">
      <Text fw="bold">Brightness</Text>
      <Slider
        value={brightness}
        onChange={setInternalBrightness}
        onChangeEnd={(value) => setBrightness(value).catch(() => {})}
        min={BRIGHTNESS.min}
        max={BRIGHTNESS.max}
        label={formatLabel}
        marks={marks}
        aria-label="LED brightness"
      />
    </Stack>
  );
}
