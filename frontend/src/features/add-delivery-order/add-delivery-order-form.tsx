import { TextField, Typography } from "@mui/material";
import AutocompleteComponent from "lib/components/autocomplete-component";
import { getAllSuppliers, insertNewSupplier } from "lib/database/suppliers-api";
import { useEffect, useState } from "react";
import type { supplier } from "types/supabase";
import AddItemElement from "./add-item-element";

export default function AddDeliveryOrderForm() {
  const [suppliers, setSuppliers] = useState<supplier[]>([]);
  const [selectedSupplierID, setSelectedSupplierID] = useState("");

  useEffect(() => {
    async function fetchSuppliers(): Promise<void> {
      const suppliersArray = await getAllSuppliers();
      setSuppliers(suppliersArray);
    }
    fetchSuppliers();
  }, []);

  return (
    <form>
      <Typography variant="h2">Delivery Order Info</Typography>
      <TextField
        required
        type="date"
        label="Delivery Date"
        slotProps={{ inputLabel: { shrink: true } }}
        defaultValue={new Date().toISOString().split("T")[0]}
        name="doDate"
        fullWidth
        margin="normal"
      />
      <AutocompleteComponent
        label="Supplier"
        optionsArray={suppliers}
        databaseInsert={insertNewSupplier}
        returnIDAsValue={setSelectedSupplierID}
        isRequired={true}
      />
      <TextField label="Ref" required fullWidth margin="normal" />
      <hr />
      <Typography variant="h2">Items</Typography>
      <AddItemElement />
    </form>
  );
}
