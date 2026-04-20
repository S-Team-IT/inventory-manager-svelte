import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { RoleContext, SessionContext } from "lib/context/context";
import { useContext } from "react";
import EnterAccount from "./enter-account";
import ExitAccount from "./exit-account";

interface props {
  toggleDrawer: () => void;
}

function Navbar({ toggleDrawer }: props) {
  const session = useContext(SessionContext);
  const role = useContext(RoleContext);

  return (
    <AppBar sx={{ bgcolor: "common.white", paddingY: 1 }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={toggleDrawer}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, color: "common.black" }} component="p">
          Inventory Management {role ? ": " + role : ""}
        </Typography>
        {session ? <ExitAccount /> : <EnterAccount />}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
