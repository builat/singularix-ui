import { API_BASE_URL } from "../../../config";
import { HTTP_METHODS, JSON_HEADERS } from "../../shared";
import { hexToRgb } from "./hex2rgb";

const methods = {
  status: "/ble-status",
  setColor: "/set-full-color",
};

/**
 * Class to manage interactions with raspberry pi led api
 * TODO: implement--
 *  - SSE
 *  - Error handling/retries
 *  - integration with effector
 */
export class LedManager {
  private connectionStatus: boolean;

  constructor() {
    this.connectionStatus = false;
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
    const res = await fetch(`${API_BASE_URL}${methods.setColor}`, {
      method: HTTP_METHODS.POST,
      headers: JSON_HEADERS,
      body: JSON.stringify(rgbColor),
    });
    if (!res.ok) throw new Error("Failed to set LED color");
  }
}
