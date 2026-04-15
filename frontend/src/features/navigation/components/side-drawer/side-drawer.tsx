import AddIcon from "@mui/icons-material/Add";
import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link as RouterLink } from "react-router"; //MUI has Link as well

interface props {
  isOpen: boolean;
  toggleDrawer: () => void;
}

const drawerList = (
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
      <ListItem>
        <RouterLink to="/add">
          <ListItemButton>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add new product" />
          </ListItemButton>
        </RouterLink>
      </ListItem>
    </List>
  </Box>
);

function SideDrawer({ isOpen, toggleDrawer }: props) {
  return (
    <Drawer open={isOpen} onClick={toggleDrawer}>
      {drawerList}
    </Drawer>
  );
}

export default SideDrawer;
