import { useContext } from "react";
import { AppBar, Typography, Toolbar } from "@mui/material";
import EnterAccount from "./components/enter-account";
import ExitAccount from "./components/exit-account";
import { SessionContext } from "lib/context/session-context";

function Navbar() {
    const [session, _setSession] = useContext(SessionContext);

    return (
        <AppBar sx={{ bgcolor: "common.white", padding: 1 }}>
            <Toolbar>
                <Typography
                    variant="h6"
                    sx={{ flexGrow: 1, color: "common.black" }}
                >
                    Inventory Manager
                </Typography>
                {session ? <ExitAccount /> : <EnterAccount />}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
