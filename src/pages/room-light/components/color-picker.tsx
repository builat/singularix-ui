import React, { useState, type ReactElement } from "react";
import { ColorInput } from "@mantine/core";
import { INPUT_COLORS } from "../service/static";

type Props = {
  setColor: (color: string) => void;
};

export function ColorPicker({ setColor }: Props): ReactElement {
  const [color, setInternalColor] = useState<string>("#a55eea");

  function handleChange(color: string) {
    setInternalColor(color);
    setColor(color);
  }
  return (
    <ColorInput
      value={color}
      onChange={handleChange}
      disallowInput={false}
      format="hex"
      placeholder="Set custom color"
      withPicker
      swatches={INPUT_COLORS}
    />
  );
}
