import React, { useState } from "react";
import { IconFingerprint } from "@tabler/icons-react";
import { Center, Stack, Tooltip, UnstyledButton } from "@mantine/core";
import classes from "./Navbar.module.css";
import { MenuNavDict, ICON_SETTINGS } from "./static";
import { NavLink as RouterNavLink } from "react-router-dom";

function NavbarLink({ Icon, label, path, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        to={path}
        component={RouterNavLink}
        onClick={onClick}
        className={classes.link}
        data-active={active || undefined}
      >
        <Icon size={ICON_SETTINGS.size} stroke={ICON_SETTINGS.stroke} />
      </UnstyledButton>
    </Tooltip>
  );
}

function findActiveIndex(): number {
  const path = window.location.pathname;
  const index = MenuNavDict.findIndex((item) => item.path === path);
  return index === -1 ? 0 : index;
}

export function NavbarMinimal({ onNavigate }: NavbarProps) {
  const [active, setActive] = useState(findActiveIndex());

  function handleClick(index: number, path: string) {
    setActive(index);
    onNavigate(path);
  }

  const links = MenuNavDict.map((link, idx) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={idx === active}
      onClick={() => handleClick(idx, link.path)}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <Center>
        <IconFingerprint size={30} stroke={1.5} />
      </Center>
      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>
    </nav>
  );
}
