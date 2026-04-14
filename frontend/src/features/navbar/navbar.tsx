import { useContext } from "react";
import { AppBar, Typography, Toolbar } from "@mui/material";
import EnterAccount from "./components/enter-account";
import ExitAccount from "./components/exit-account";
import { RoleContext, SessionContext } from "lib/context/context";

function Navbar() {
    const session = useContext(SessionContext);
    const role = useContext(RoleContext);

    return (
        <AppBar sx={{ bgcolor: "common.white", paddingTop: 1 }}>
            <Toolbar>
                <Typography
                    variant="h6"
                    sx={{ flexGrow: 1, color: "common.black" }}
                >
                    Managing Inventory: {role}
                </Typography>
                {session ? <ExitAccount /> : <EnterAccount />}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
