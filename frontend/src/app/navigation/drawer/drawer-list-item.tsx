import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import type { PropsWithChildren } from "react";
import { Link as RouterLink } from "react-router";

interface props extends PropsWithChildren {
  route: string;
  description: string;
}

export default function DrawerListItem({
  route,
  description,
  children: icon,
}: props) {
  return (
    <ListItem>
      <RouterLink to={route}>
        <ListItemButton>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={description} />
        </ListItemButton>
      </RouterLink>
    </ListItem>
  );
}
