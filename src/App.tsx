import "@mantine/core/styles.css";
import "/src/shared/global.css";
import React from "react";
import appLogo from "@/src/assets/icon_60pt.png";
import { Image } from "@mantine/core";
import { Routes, Route, Outlet } from "react-router-dom";
import { RoomLightPage, StatusPage } from "./pages";
import {
  AppShell,
  Burger,
  Group,
  Title,
  useMantineTheme,
  Flex,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { NavbarMinimal } from "./shared/navbar/Navbar";
import { API_BASE_URL } from "./config";
import { useSse } from "./shared/hooks";

export default function App() {
  const _ = useSse(`${API_BASE_URL}/led/events`);

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
            <Flex
              gap="xs"
              justify="flex-start"
              align="center"
              direction="row"
              wrap="wrap"
              mb="md"
            >
              <Image src={appLogo} alt="Singularix Logo" w={50} h={50} />
              <Title order={5}>Singularix Home</Title>
            </Flex>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="xs">
        <AppShell.Section grow>
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
          <Route path="/status" element={<StatusPage />}></Route>
        </Routes>

        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
