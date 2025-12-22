import "@mantine/core/styles.css";
import "/src/shared/global.css";
import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { RoomLightPage } from "./pages";
import {
  AppShell,
  Burger,
  Group,
  Title,
  ScrollArea,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { NavbarMinimal } from "./shared/navbar/Navbar";

export default function App() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const theme = useMantineTheme();

  return (
    <AppShell
      header={{ height: 52 }}
      navbar={{
        width: { sm: 90 },
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="sm" justify="space-between">
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Title order={5}>Singularix Home</Title>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="xs">
        <AppShell.Section
          grow
          component={ScrollArea}
          type="auto"
          offsetScrollbars
        >
          <NavbarMinimal onNavigate={close} />
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main
        style={{
          background: theme.colors.dark[8],
        }}
      >
        <Routes>
          <Route path="/" element={<RoomLightPage />}></Route>
        </Routes>

        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
