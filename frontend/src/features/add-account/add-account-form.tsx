import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { createProfile, createUser } from "lib/database/users-profiles-api";
import { useState } from "react";

type Roles = "QS" | "Procurement" | "Project";

export default function AddAccountForm() {
  const [password, _setPassword] = useState<number>(
    Math.floor(Math.random() * 999999),
  );
  const [role, setRole] = useState<Roles>("QS");

  async function onSubmit(
    e: React.SubmitEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault();
    const data: FormData = new FormData(e.target);
    const email: string = data.get("email") as string;
    const password: string = data.get("password") as string;
    const role: string = data.get("role") as string;

    const userUUID = await createUser(email, password);
    if (!userUUID) {
      alert("Email is already registered.");
      return;
    }

    const isProfileCreated = await createProfile(
      userUUID,
      "FIRST_NAME_HERE",
      role,
    );
    if (isProfileCreated) {
      alert(
        "Account created! An email has been sent for the user to complete registration.",
      );
      return;
    }
    console.error("Profile not created");
  }

  function handleChangeRole(e: React.ChangeEvent<HTMLInputElement, Element>) {
    setRole(e.target.value as Roles);
  }

  return (
    <form onSubmit={onSubmit} autoComplete="off">
      <Typography variant="h5">Create account </Typography>
      <TextField
        type="email"
        name="email"
        margin="normal"
        label="Email"
        variant="outlined"
        required
        fullWidth
        helperText="The email will be sent a link to complete registration"
      />
      <input type="hidden" value={password} name="password" />
      <div>
        <FormControl fullWidth>
          <FormLabel>Role</FormLabel>
          <RadioGroup name="role" value={role} onChange={handleChangeRole}>
            <FormControlLabel value="QS" control={<Radio />} label="QS" />
            <FormControlLabel
              value="Procurement"
              control={<Radio />}
              label="Procurement"
            />
            <FormControlLabel
              value="Project"
              control={<Radio />}
              label="Project"
            />
          </RadioGroup>
        </FormControl>
        <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
          Submit
        </Button>
      </div>
    </form>
  );
}
