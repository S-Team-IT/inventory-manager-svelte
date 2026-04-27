import { Grid } from "@mui/material";
import AddDeliveryOrderForm from "features/add-delivery-order/add-delivery-order-form";

export default function ProductProcurement() {
  return (
    <Grid container>
      <Grid size="grow" />
      <Grid size={5}>
        <AddDeliveryOrderForm />
      </Grid>
      <Grid size="grow" />
    </Grid>
  );
}
