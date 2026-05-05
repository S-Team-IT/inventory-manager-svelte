import { Button, TextField, Typography } from "@mui/material";
import { SessionContext } from "lib/context/context";
import {
  updatePassword,
  updateVerified,
} from "lib/database/users-profiles-api";
import { useContext } from "react";

export default function UpdatePasswordForm() {
  const session = useContext(SessionContext);
  async function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!session) return;
    const data: FormData = new FormData(e.target);
    const newPassword = data.get("new-pass") as string;
    const isUpdated = await updatePassword(newPassword);
    if (!isUpdated) {
      console.error("Not updated");
      return;
    }
    const isVerified = await updateVerified(true, session.user.id);
    if (!isVerified) {
      console.error("Not verified");
      return;
    }
    alert("Password changed!");

    window.location.reload();
  }

  return (
    <>
      <Typography variant="h5">
        Change your password to activate your account
      </Typography>
      <form onSubmit={onSubmit}>
        <TextField
          type="password"
          label="New Password"
          required
          name="new-pass"
        />
        <Button type="submit" variant="contained">
          Change
        </Button>
      </form>
    </>
  );
}
