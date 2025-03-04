import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import Link from "next/link";
import { Menu } from "@mui/material";
import { usePathname } from "next/navigation";
import { PathnameContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";

type MenuItem = {
  text: string;
  icon: any;
  path: string;
};

function Item({ item }: { item: MenuItem }) {
  const pathname = usePathname();
  const selected = React.useMemo(() => {
    let path = item.path;
    if (path.endsWith("/")) {
      // remove trailing slash
      path = path.slice(0, -1);
    }

    return pathname === path;
  }, [pathname]);
  return (
    <ListItem disablePadding sx={{ display: "block" }}>
      <Link href={item.path}>
        <ListItemButton selected={selected}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      </Link>
    </ListItem>
  );
}

const mainListItems: MenuItem[] = [
  { text: "Home", icon: <HomeRoundedIcon />, path: "/dashboard" },
  { text: "users", icon: <AnalyticsRoundedIcon />, path: "/dashboard/users" },
];

const secondaryListItems: MenuItem[] = [
  { text: "Settings", icon: <SettingsRoundedIcon />, path: "/settings" },
  { text: "About", icon: <InfoRoundedIcon />, path: "/about" },
  { text: "Feedback", icon: <HelpRoundedIcon />, path: "/feedback" },
];

export default function MenuContent() {
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <Item key={index} item={item} />
        ))}
      </List>
      <List dense>
        {secondaryListItems.map((item, index) => (
          <Item key={index} item={item} />
        ))}
      </List>
    </Stack>
  );
}
