import { TextField, Typography } from "@mui/material";
import AddItemElement from "./add-item-element";

export function OutgoingTransactionForm() {
  function handleSubmit() {}

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5">Outgoing Items</Typography>
      <Typography variant="h6">General</Typography>
      <TextField
        required
        type="date"
        label="Delivery Date"
        slotProps={{ inputLabel: { shrink: true } }}
        defaultValue={new Date().toISOString().split("T")[0]}
        name="date"
        fullWidth
        margin="normal"
      />
      <TextField label="Name" fullWidth margin="normal" name="name" />
      <TextField label="Remarks" fullWidth margin="normal" name="remark" />
      <hr />
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Items
      </Typography>
      <AddItemElement />
    </form>
  );
}
