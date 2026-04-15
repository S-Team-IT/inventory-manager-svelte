import { AppBar, Toolbar, Typography } from "@mui/material";
import { RoleContext, SessionContext } from "lib/context/context";
import { useContext } from "react";
import EnterAccount from "./components/enter-account";
import ExitAccount from "./components/exit-account";

function Navbar() {
  const session = useContext(SessionContext);
  const role = useContext(RoleContext);

  return (
    <AppBar sx={{ bgcolor: "common.white", paddingY: 1 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: "common.black" }} component="p">
          Managing Inventory: {role}
        </Typography>
        {session ? <ExitAccount /> : <EnterAccount />}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
