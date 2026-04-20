import { Drawer } from "@mui/material";
import DrawerList from "./components/drawer-list";

interface props {
  isOpen: boolean;
  toggleDrawer: () => void;
}

function SideDrawer({ isOpen, toggleDrawer }: props) {
  return (
    <Drawer open={isOpen} onClick={toggleDrawer}>
      <DrawerList />
    </Drawer>
  );
}

export default SideDrawer;
