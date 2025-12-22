import React from "react";
import { useMemo } from "react";
import { Box, Button, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { LedManager } from "./service";
import { LedRoomCard } from "./components/led-card";

const ledManager = LedManager.getInstance();

export function RoomLightPage() {
  const reserved = useMemo(
    () => [
      { name: "Cyberpunk", hex: "#4d4100" },
      { name: "Red", hex: "#5c0000" },
      { name: "Grass", hex: "#105e00" },
      { name: "Blue", hex: "#080073" },
      { name: "Anime", hex: "#390070" },
      { name: "Disable", hex: "#000000" },
    ],
    []
  );

  return (
    <Box>
      <Title order={2} mb="md">
        LED Lights
      </Title>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md" verticalSpacing="md">
        <Stack gap="sm">
          <Text fw={600}>Reserved colors</Text>
          <SimpleGrid cols={{ base: 2, sm: 2, md: 4 }} spacing="sm">
            {reserved.map((c) => (
              <Button
                key={c.hex}
                variant="light"
                radius="md"
                onClick={() => ledManager.setLedColor(c.hex)}
                leftSection={
                  <Box
                    w={14}
                    h={14}
                    style={{
                      backgroundColor: c.hex,
                      borderRadius: 999,
                      border: "1px solid var(--mantine-color-gray-3)",
                    }}
                  />
                }
                styles={{
                  inner: { justifyContent: "flex-start" },
                }}
              >
                {c.name}
              </Button>
            ))}
          </SimpleGrid>
        </Stack>
        <LedRoomCard />
      </SimpleGrid>
    </Box>
  );
}
