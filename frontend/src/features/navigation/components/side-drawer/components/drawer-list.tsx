import AddIcon from "@mui/icons-material/Add";
import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { RoleContext } from "lib/context/context";
import { useContext } from "react";
import { Link as RouterLink } from "react-router";

export default function DrawerList() {
  const role = useContext(RoleContext);

  return (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <ListItem>
          <RouterLink to="/">
            <ListItemButton>
              <ListItemIcon>
                <HomeFilledIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </RouterLink>
        </ListItem>
        <Divider />
        {role === "QS" && (
          <ListItem>
            <RouterLink to="/add">
              <ListItemButton>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Add new item" />
              </ListItemButton>
            </RouterLink>
          </ListItem>
        )}
      </List>
    </Box>
  );
}
