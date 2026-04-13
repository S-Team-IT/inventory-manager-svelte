import { Button } from "@mui/material";
import { supabase } from "lib/database/supabase";

function ExitAccount() {
    async function logout() {
        await supabase.auth.signOut();
    }

    return (
        <Button variant="outlined" onClick={logout}>
            Logout
        </Button>
    );
}

export default ExitAccount;
