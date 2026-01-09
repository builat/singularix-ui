import React from "react";
import { useUnit } from "effector-react";
import { ScrollArea, Box, Text } from "@mantine/core";
import { $events } from "@/src/models/sse";
import { Affix, Paper } from "@mantine/core";
import { RawNotification } from "@/src/shared/sse/protocol-parser";

function NoEventsPlaceholder() {
  return (
    <Text c="dimmed" size="xs">
      No events yet…
    </Text>
  );
}

type Props = { idx: number; notification: RawNotification };
const LOG_LINE_STYLE = {
  tsStyle: { color: "#8a8e89" },
  commandStyle: { color: "#416737" },
};
function LogLine({ notification, idx }: Props) {
  const { ts, command, status_code } = notification;
  return (
    <div key={ts + "-" + idx}>
      <span style={LOG_LINE_STYLE.tsStyle}>
        [{new Date(ts).toLocaleTimeString()}]
      </span>{" "}
      <span style={LOG_LINE_STYLE.commandStyle}>
        {!status_code ? "✅" : "❌"} {command}
      </span>
    </div>
  );
}

function ContentControl({ events }: { events: RawNotification[] }) {
  if (!events.length) return <NoEventsPlaceholder />;

  return (
    <>
      {events.map((x, i) => (
        <LogLine key={i} notification={x} idx={i} />
      ))}
    </>
  );
}

const LOG_WINDOW_STYLE: Record<string, React.CSSProperties> = {
  box: {
    border: "1px solid #373737",
    borderRadius: 4,
    backgroundColor: "#1e1e1e",
  },
  scrollArea: {
    height: 200,
  },
  pre: {
    margin: 0,
    padding: "8px 10px",
    fontFamily:
      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    fontSize: 12,
    lineHeight: 1.4,
    color: "#d4d4d4",
    background: "transparent",
  },
  paper: { background: "#000", width: 360 },
  affix: { bottom: 12, right: 12 },
};

export default function LogWindow() {
  const events = useUnit($events);
  return (
    <Affix position={LOG_WINDOW_STYLE.affix}>
      <Paper withBorder shadow="sm" radius="md" style={LOG_WINDOW_STYLE.paper}>
        <Box style={LOG_WINDOW_STYLE.box}>
          <ScrollArea style={LOG_WINDOW_STYLE.scrollArea} type="auto">
            <Box component="pre" style={LOG_WINDOW_STYLE.pre}>
              <ContentControl events={events} />
            </Box>
          </ScrollArea>
        </Box>
      </Paper>
    </Affix>
  );
}
