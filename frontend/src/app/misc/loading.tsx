import { Container, Stack, Typography } from "@mui/material";

export default function Loading() {
  return (
    <Container component="main">
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ width: 1, height: "100vh" }}
      >
        <Typography variant="h6" component="h1">
          Loading...
        </Typography>
      </Stack>
    </Container>
  );
}
