import { Button, Toolbar } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "./components/navbar/navbar";
import SideDrawer from "./components/side-drawer/side-drawer";

function Navigation() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  function toggleDrawer() {
    setDrawerOpen(!isDrawerOpen);
  }

  return (
    <>
      <Button onClick={toggleDrawer}>adf</Button>
      <Navbar toggleDrawer={toggleDrawer} />
      <Toolbar /> {/*Toolbar is needed to push components out from under the Navbar*/}
      <SideDrawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <Outlet />
    </>
  );
}

export default Navigation;
