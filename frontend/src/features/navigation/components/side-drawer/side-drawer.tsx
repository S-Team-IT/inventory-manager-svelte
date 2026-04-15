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

interface props {
  isOpen: boolean;
  toggleDrawer: () => void;
}

const drawerList = (
  <Box sx={{ width: 250 }} role="presentation">
    <List>
      <ListItem>
        <ListItemButton>
          <ListItemIcon>
            <HomeFilledIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemButton>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Add new product" />
        </ListItemButton>
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
