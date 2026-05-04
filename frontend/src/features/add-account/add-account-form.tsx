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

export default function AddAccountForm() {
  async function onSubmit(
    e: React.SubmitEvent<HTMLFormElement>,
  ): Promise<void> {
    const data: FormData = new FormData(e.target);
    console.log(data);
  }

  function generateRandomPassword(): number {
    const randomNumber = Math.floor(Math.random() * 999999);
    return randomNumber;
  }

  return (
    <form onSubmit={onSubmit}>
      <Typography variant="h5">Create account </Typography>
      <TextField
        name="email"
        margin="normal"
        label="Email"
        variant="outlined"
        required
        fullWidth
      />
      <TextField
        name="password"
        margin="normal"
        label="Password"
        variant="outlined"
        fullWidth
        required
        helperText="This is pre-generated, the user will be able to change their password once they login."
        disabled
        value={generateRandomPassword()}
      />
      <div>
        <FormControl fullWidth>
          <FormLabel>Role</FormLabel>
          <RadioGroup name="role">
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
