import {
  IconCalendarStats,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconGauge,
  IconHome2,
  IconSettings,
} from "@tabler/icons-react";

export const MenuNavDict: MenuNavItem[] = [
  { Icon: IconHome2, label: "Room Light", path: "/" },
  { Icon: IconGauge, label: "Sensors", path: "/sensors" },
  {
    Icon: IconDeviceDesktopAnalytics,
    label: "Full state",
    path: "/full-state",
  },
  { Icon: IconCalendarStats, label: "Schedule", path: "/schedule" },
  { Icon: IconFingerprint, label: "Remote control", path: "/remote-control" },
  { Icon: IconSettings, label: "Settings", path: "/settings" },
];

export const ICON_SETTINGS = { size: 20, stroke: 1.5 };
