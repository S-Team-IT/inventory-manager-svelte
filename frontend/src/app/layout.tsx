import { Grid } from "@mui/material";
import type { PropsWithChildren } from "react";

interface props extends PropsWithChildren {
  spacing: number;
}

export default function Layout({ spacing, children }: props) {
  return (
    <Grid container>
      <Grid size="grow" />
      <Grid size={spacing}>{children}</Grid>
      <Grid size="grow" />
    </Grid>
  );
}
