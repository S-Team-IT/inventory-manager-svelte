import { Button, Stack, TextField } from "@mui/material";
import { supabase } from "lib/database/supabase";
import { useState } from "react";

function EnterAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    //Once you write one of these event handlers
    //You will never want to stop beating react to death with hammers
    setEmail(e.target.value);
  }

  function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  async function handleSubmission(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("Error entering account: ", error);
      alert(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmission} autoComplete="off">
      <Stack spacing={2} direction={"row"}>
        <TextField
          id="outlined-basic"
          label="Email"
          type="email"
          required
          onChange={handleChangeEmail}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          type="Password"
          onChange={handleChangePassword}
          required
          slotProps={{ htmlInput: { minLength: 6 } }}
        />
        <Button type="submit" variant="outlined">
          Sign in
        </Button>
      </Stack>
    </form>
  );
}

export default EnterAccount;
