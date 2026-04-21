import { Button, Typography } from "@mui/material";
import { Container, Grid, Stack } from "@mui/system";
import ProductTable from "features/product-table/product-table";
import TransactionLog from "features/transaction-log/transaction-log";
import { FilterContext } from "lib/context/context";
import { useState } from "react";
import type { FILTER } from "types/misc";

export default function ProductDashboard() {
  const [filter, setFilter] = useState<FILTER>("none");
  const [filterArg, setFilterArg] = useState("");

  function handleClearFilter() {
    setFilter("none");
    setFilterArg("");
  }

  return (
    <FilterContext value={{ filter, setFilter, filterArg, setFilterArg }}>
      <Container maxWidth={false} sx={{ marginX: 2 }}>
        <Grid container spacing={2}>
          {filter != "none" && (
            <Grid size={12}>
              <Stack direction="row" spacing={2}>
                <Typography variant="h6" component="h1">
                  Filtering for: {filter} {filterArg}
                </Typography>
                <Button variant="contained" onClick={handleClearFilter}>
                  Clear
                </Button>
              </Stack>
            </Grid>
          )}
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
