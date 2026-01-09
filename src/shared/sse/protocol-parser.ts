export type ParsedNotification = {
  ts: Date;
  status: 1 | 0;
  command: string;
  detail: string;
};

export type RawNotification = {
  ts: number;
  status: string;
  command: string;
  detail: string;
  status_code: 1 | 0;
  command_code: number;
  detail_code: number;
};

export function parseSseEvent(
  data: RawNotification
): ParsedNotification | null {
  return {
    ts: new Date(data.ts),
    status: data.status_code,
    command: data.command,
    detail: data.detail,
  };
}
