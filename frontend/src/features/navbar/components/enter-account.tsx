import { useState, useContext } from "react";
import { supabase } from "lib/database/supabase";
import { Stack, TextField, Button } from "@mui/material";
import { SessionContext } from "lib/context/session-context";

function EnterAccount() {
    const [_session, setSession] = useContext(SessionContext);
    const [isSignIn, setIsSignIn] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSignOption() {
        setIsSignIn(!isSignIn);
    }

    function handleChangeEmail(e: any) {
        //Once you write one of these event handlers
        //You will never want to stop beating react to death with hammers
        setEmail((e.target as HTMLInputElement).value);
    }

    function handleChangePassword(e: any) {
        setPassword((e.target as HTMLInputElement).value);
    }

    async function handleSubmission(e: any) {
        e.preventDefault();
        if (isSignIn) {
            const { error: signInError, data } =
                await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
            if (signInError) {
                console.error("Error signing in", signInError);
            }
            setSession(data.session);
        } else {
            const { error: signUpError, data } = await supabase.auth.signUp({
                email,
                password,
            });
            if (signUpError) {
                console.error("Error signing in", signUpError);
            }
            setSession(data.session);
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
