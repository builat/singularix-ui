import { API_BASE_URL } from "@/src/config";
import { HTTP_METHODS, JSON_HEADERS } from "@/src/shared";
import { hexToRgb } from "../pages/room-light/service/hex2rgb";

const LED_PREFIX = "/led";
const LED_API_BASE_URL = `${API_BASE_URL}${LED_PREFIX}`;
const methods = {
  status: "/ble-status",
  setColor: "/color",
  setBrightness: "/brightness",
  debug: "/debug",
  setRainbow: "/rainbow",
  setRange: "/range",
  subscribeSSE: "/events",
};

/**
 * Class to manage interactions with raspberry pi led api
 * TODO: implement--
 *  - SSE
 *  - Error handling/retries
 *  - integration with effector
 */
export class LedManager {
  private static instance: LedManager | null = null;

  private connectionStatus: boolean;

  private constructor() {
    this.connectionStatus = false;
  }

  static getInstance(): LedManager {
    if (!LedManager.instance) {
      LedManager.instance = new LedManager();
    }
    return LedManager.instance;
  }

  get isConnected(): boolean {
    return this.connectionStatus;
  }

  async getLedStatus(): Promise<boolean> {
    const res = await fetch(`${API_BASE_URL}${methods.status}`);
    if (!res.ok) throw new Error("Failed to fetch LED status");
    const ledStatus: boolean = await res.json();
    this.connectionStatus = ledStatus;
    return ledStatus;
  }

  async setLedColor(hexColor: string): Promise<void> {
    const rgbColor = hexToRgb(hexColor);
    const res = await fetch(`${LED_API_BASE_URL}${methods.setColor}`, {
      method: HTTP_METHODS.POST,
      headers: JSON_HEADERS,
      body: JSON.stringify(rgbColor),
    });
    if (!res.ok) throw new Error("Failed to set LED color");
  }

  async setRainbow(): Promise<void> {
    const res = await fetch(`${LED_API_BASE_URL}${methods.setRainbow}`, {
      method: HTTP_METHODS.POST,
      headers: JSON_HEADERS,
    });
    if (!res.ok) throw new Error("Failed to set LED color");
  }
}
