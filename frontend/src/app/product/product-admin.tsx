import { Grid } from "@mui/system";
import AddProductForm from "features/add-product/add-product-form";
import { RoleContext } from "lib/context/context";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";

export default function ProductAdmin() {
  const role = useContext(RoleContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "QS") {
      navigate("/*");
    }
  }, [role, navigate]);

  return (
    <Grid container>
      <Grid size="grow" />
      <Grid size={3}>
        <AddProductForm />
      </Grid>
      <Grid size="grow" />
    </Grid>
  );
}
