import { AppBar, Typography, Toolbar } from "@mui/material";
import EnterAccount from "./components/enter-account";
import ExitAccount from "./components/exit-account";

function Navbar() {
    return (
        <AppBar sx={{ bgcolor: "common.white" }}>
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
