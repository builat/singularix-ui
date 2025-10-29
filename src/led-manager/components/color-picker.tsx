import React, { ReactElement } from "react";
import { ColorInput } from "@mantine/core";
import { INPUT_COLORS } from "../service/static";

type Props = {
  color: string;
  setColor: (color: string) => void;
};

export function ColorPicker({ color, setColor }: Props): ReactElement {
  return (
    <ColorInput
      value={color}
      onChange={setColor}
      disallowInput={false}
      format="hex"
      placeholder="#RRGGBB"
      withPicker
      swatches={INPUT_COLORS}
    />
  );
}
