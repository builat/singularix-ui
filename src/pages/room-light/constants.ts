const PAGE_GRID = { base: 1, md: 1 };
const RESERVED_COLORS_GRID = { base: 2, sm: 2, md: 4 };

// @TODO: fetch from backend
const reserved_colors: ReservedColor[] = [
  { name: "Cyberpunk", hex: "#4d4100" },
  { name: "Red", hex: "#5c0000" },
  { name: "Grass", hex: "#105e00" },
  { name: "Pinky", hex: "#a80095" },
  { name: "Blue", hex: "#080073" },
  { name: "Ocean", hex: "#008080" },
  { name: "Anime", hex: "#390070" },
  { name: "Disable", hex: "#000000" },
];
const STATUS_POLL_INTERVAL = 3000;

// Matches the 0-255 byte range the LED firmware uses per channel
const BRIGHTNESS = { min: 0, max: 255, default: 255 };

export {
  PAGE_GRID,
  reserved_colors,
  STATUS_POLL_INTERVAL,
  RESERVED_COLORS_GRID,
  BRIGHTNESS,
};
