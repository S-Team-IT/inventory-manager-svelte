import { TextField, Typography } from "@mui/material";
import { SessionContext } from "lib/context/context";
import { insertNewOutgoingTransaction } from "lib/database/outgoing-transactions-api";
import {
  getQuantityByMaster,
  updateProductQuantity,
} from "lib/database/products-api";
import { insertBulkTransactions } from "lib/database/transactions-api";
import { useContext, useState } from "react";
import type { transactionInsert } from "types/supabase";
import Loading from "../../app/misc/loading";
import AddItemElement from "./add-item-element";

export function OutgoingTransactionForm() {
  const session = useContext(SessionContext);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    if (!session) return;
    e.preventDefault();
    const data: FormData = new FormData(e.target);

    const useDate: Date = new Date(Date.parse(data.get("date") as string));
    const name: string = data.get("name") as string;
    const remark: string = data.get("remark") as string;
    const masters: string[] = data.getAll("master") as string[];
    // terrifying
    const quantities: number[] = (data.getAll("quantity") as string[]).map(
      (quantityString) => Number(quantityString) * -1,
    );

    try {
      setIsLoading(true);
      const outgoingID: string = await insertNewOutgoingTransaction(
        useDate,
        name,
        remark,
      );
      if (outgoingID === "") {
        console.error("Outgoing tuple ID is already inside database.");
        alert("Outgoing tuple ID is already inside database.");
        return;
      }
      const newTransactions: transactionInsert[] = [];
      for (let i = 0; i < masters.length; i++) {
        console.log(i);
        newTransactions.push({
          logger_id: session.user.id,
          product_id: masters[i],
          quantity_changed: quantities[i],
          outgoing_id: outgoingID,
        });
      }

      if (!insertBulkTransactions(newTransactions)) {
        throw new Error("Bulk insertion failed");
      }

      if (!updateQuantities(newTransactions)) {
        throw new Error("update quantity failed");
      }
    } catch (e) {
      console.error(e);
      return;
    } finally {
      setIsLoading(false);
    }
    alert("Added :)");
  }

  async function updateQuantities(
    transactions: transactionInsert[],
  ): Promise<boolean> {
    try {
      transactions.forEach(
        async ({
          product_id: productID,
          quantity_changed: quantityChanged,
        }) => {
          let currentQuantity: number | null =
            await getQuantityByMaster(productID);
          if (!currentQuantity) {
            throw new Error("quantity not fetched(?)");
          }
          currentQuantity += quantityChanged;
          updateProductQuantity(productID, currentQuantity);
        },
      );
    } catch (e) {
      console.error(e);
      return false;
    }
    return true;
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
