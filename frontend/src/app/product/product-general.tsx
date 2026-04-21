import { Container, Grid } from "@mui/system";
import ProductTable from "features/product-table/product-table";
import TransactionLog from "features/transaction-log/transaction-log";
import { FilterContext } from "lib/context/context";
import { useEffect, useState } from "react";
import type { FILTER } from "types/misc";

export default function ProductDashboard() {
  const [filter, setFilter] = useState<FILTER>("none");
  const [filterArg, setFilterArg] = useState("");

  useEffect(() => {
    console.log("filter changed");
    console.log("or filterarg changed");
  }, [filter, filterArg]);

  return (
    <FilterContext value={{ filter, setFilter, filterArg, setFilterArg }}>
      <Container maxWidth={false} sx={{ marginX: 2 }}>
        <Grid container spacing={2}>
          <Grid size={{ sm: 12, lg: 8 }} component="section">
            <ProductTable />
          </Grid>
          <Grid size={4} component="section">
            <TransactionLog />
          </Grid>
        </Grid>
      </Container>
    </FilterContext>
  );
}
