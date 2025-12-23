import React from "react";
import { Box, Button } from "@mantine/core";
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
export { MapReservedColorButtons, ReservedColorButton };
