import { Button, Stack, TextField } from "@mui/material";
import { AuthError } from "@supabase/supabase-js";
import { supabase } from "lib/database/supabase";
import { useState } from "react";

function EnterAccount() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignOption() {
    setIsSignIn(!isSignIn);
  }

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
    let error:AuthError|null;
    if (isSignIn) {
      ({error} = await supabase.auth.signInWithPassword({ email, password }));
    } else {
      ({error} = await supabase.auth.signUp({ email, password }));
    }
    if (error) {
      console.error("Error entering account: ", error);
    }
  }

  return (
    <form onSubmit={handleSubmission}>
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
          {isSignIn ? "Sign in" : "Sign Up"}
        </Button>
        <Button variant="outlined" onClick={handleSignOption}>
          Switch
        </Button>
      </Stack>
    </form>
  );
}

export default EnterAccount;
