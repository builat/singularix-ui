import React from "react";
import { Box, Button, Group } from "@mantine/core";
import { set } from "ramda";
type Props = {
  btnConfig: { name: string; hex: string };
  setColor: (color: string) => void;
};

const preservedStyle = {
  button: { inner: { justifyContent: "flex-start" } },
  box: {
    borderRadius: 999,
    border: "1px solid var(--mantine-color-gray-3)",
  },
};

function ColoredBtnBadge({ color }: { color: string }) {
  return (
    <Box
      w={14}
      h={14}
      style={{
        backgroundColor: color,
        borderRadius: preservedStyle.box.borderRadius,
        border: preservedStyle.box.border,
      }}
    />
  );
}
function ReservedColorButton({ btnConfig, setColor }: Props) {
  return (
    <Button
      key={btnConfig.hex}
      variant="light"
      radius="md"
      onClick={() => setColor(btnConfig.hex)}
      leftSection={<ColoredBtnBadge color={btnConfig.hex} />}
      styles={preservedStyle.button}
    >
      {btnConfig.name}
    </Button>
  );
}
function RainbowKnob() {
  return (
    <Box
      component="span"
      style={{
        width: 14,
        height: 14,
        borderRadius: 999,
        display: "inline-block",
        background: "conic-gradient(red, #ff0, lime, cyan, blue, magenta, red)",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,.2) inset, 0 0 6px rgba(0,0,0,.4)",
      }}
      aria-hidden
    />
  );
}
type RainbowButtonProps = {
  setRainbow: () => Promise<void>;
};
function RainbowButton({ setRainbow }: RainbowButtonProps) {
  return (
    <Button
      variant="light"
      leftSection={<RainbowKnob />}
      onClick={setRainbow}
      styles={preservedStyle.button}
      aria-label="Activate rainbow effect"
    >
      Rainbow
    </Button>
  );
}

type MRCProps = {
  reserved: ReservedColor[];
  setColor: (color: string) => void;
};

function MapReservedColorButtons({ reserved, setColor }: MRCProps) {
  return (
    <>
      {reserved.map((c) => (
        <ReservedColorButton key={c.hex} btnConfig={c} setColor={setColor} />
      ))}
    </>
  );
}
export { MapReservedColorButtons, ReservedColorButton, RainbowButton };
