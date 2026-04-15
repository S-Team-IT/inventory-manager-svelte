import { Button, Stack, Typography } from "@mui/material";
import { SessionContext } from "lib/context/context";
import { supabase } from "lib/database/supabase";
import { useContext } from "react";

function ExitAccount() {
  const session = useContext(SessionContext);

  async function logout() {
    await supabase.auth.signOut();
  }

  return (
    <Stack direction="row" spacing={1}>
      <Typography variant="h6" sx={{ color: "common.black" }}>
        {session?.user.email}
      </Typography>
      <Button variant="outlined" onClick={logout}>
        Logout
      </Button>
    </Stack>
  );
}

export default ExitAccount;
