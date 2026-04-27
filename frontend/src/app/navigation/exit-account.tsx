import { Button, Stack, Typography } from "@mui/material";
import { SessionContext } from "lib/context/context";
import { supabase } from "lib/database/supabase";
import { useContext } from "react";
import { useNavigate } from "react-router";

function ExitAccount() {
  const session = useContext(SessionContext);
  const navigate = useNavigate();

  async function logout() {
    await supabase.auth.signOut();
    navigate("/");
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
