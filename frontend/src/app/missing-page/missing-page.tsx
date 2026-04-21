import { Button, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";

export default function MissingPage() {
  const navigate = useNavigate();

  function handleReturnHome() {
    navigate("/");
  }

  return (
    <Container component="main">
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ width: 1, height: "100vh" }}
      >
        <Typography variant="h6" component="h1">
          Page not found
        </Typography>
        <Button onClick={handleReturnHome} variant="contained">
          Return home
        </Button>
      </Stack>
    </Container>
  );
}
