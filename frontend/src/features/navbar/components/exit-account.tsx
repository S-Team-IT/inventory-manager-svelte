import { Button } from "@mui/material";

function ExitAccount() {
    return (
        <Button variant="outlined" onClick={logout}>
            Logout
        </Button>
    );
}

export default ExitAccount;
