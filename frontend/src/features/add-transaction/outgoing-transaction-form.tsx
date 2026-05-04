import { TextField, Typography } from "@mui/material";
import { SessionContext } from "lib/context/context";
import { insertBulkTransactions } from "lib/database/transactions-api";
import { useContext, useState } from "react";
import type { transactionInsert } from "types/supabase";
import AddItemElement from "./add-item-element";
import Loading from "../../app/misc/loading";

export function OutgoingTransactionForm() {
  const session = useContext(SessionContext);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    if (!session) return;
    e.preventDefault();
    const data: FormData = new FormData(e.target);

    const date: Date = new Date(Date.parse(data.get("date") as string));
    const name: string = data.get("name") as string;
    const remark: string = data.get("remark") as string;
    const masters: string[] = data.getAll("master") as string[];
    // terrifying
    const quantities: number[] = (data.getAll("quantity") as string[]).map(
      (quantityString) => Number(quantityString) * -1,
    );

    try {
      setIsLoading(true);
      const newTransactions: transactionInsert[] = [];
      for (let i = 0; i < masters.length; i++) {
        console.log(i);
        newTransactions.push({
          logger_id: session.user.id,
          product_id: masters[i],
          quantity_changed: quantities[i],
        });
      }
      const isSuccess = await insertBulkTransactions(newTransactions);
      if (!isSuccess) throw new Error("Bulk insertion failed");
    } catch (e) {
      console.error(e);
      return;
    } finally {
      setIsLoading(false);
    }
    alert("DO added :)");
  }

  if (isLoading) return <Loading />;

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
      <TextField label="Name" fullWidth margin="normal" name="name" required />
      <TextField label="Remarks" fullWidth margin="normal" name="remark" />
      <hr />
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Items
      </Typography>
      <AddItemElement />
    </form>
  );
}
