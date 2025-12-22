type Rgb = { r: number; g: number; b: number };

export function hexToRgb(hex: string): Rgb {
  let s = hex.trim().replace(/^#/, "").toLowerCase();
  if (s.length === 3)
    s = s
      .split("")
      .map((c) => c + c)
      .join("");
  if (!/^[0-9a-f]{6}$/.test(s)) return { r: 255, g: 255, b: 255 };
  const n = parseInt(s, 16);
  return { r: (n >> 16) & 0xff, g: (n >> 8) & 0xff, b: n & 0xff };
}
