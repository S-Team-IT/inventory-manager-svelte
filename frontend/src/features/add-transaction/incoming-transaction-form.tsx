import { TextField, Typography } from "@mui/material";
import AutocompleteComponent from "lib/components/autocomplete-component";
import { SessionContext } from "lib/context/context";
import { insertNewDeliveryOrder } from "lib/database/delivery-orders-api";
import {
  getQuantityByMaster,
  updateProductQuantity,
} from "lib/database/products-api";
import { getAllSuppliers, insertNewSupplier } from "lib/database/suppliers-api";
import { insertBulkTransactions } from "lib/database/transactions-api";
import { useContext, useEffect, useState } from "react";
import type { supplier, transactionInsert } from "types/supabase";
import Loading from "../../app/misc/loading";
import AddItemElement from "./add-item-element";

export default function IncomingTransactionForm() {
  const session = useContext(SessionContext);
  const [isLoading, setIsLoading] = useState(false);
  const [suppliers, setSuppliers] = useState<supplier[]>([]);
  const [selectedSupplierID, setSelectedSupplierID] = useState("");

  useEffect(() => {
    async function fetchSuppliers(): Promise<void> {
      const suppliersArray = await getAllSuppliers();
      setSuppliers(suppliersArray);
    }
    fetchSuppliers();
  }, []);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    if (!session) return;
    e.preventDefault();
    const data: FormData = new FormData(e.target);

    const date: Date = new Date(Date.parse(data.get("date") as string));
    const ref: string = data.get("ref") as string;
    const masters: string[] = data.getAll("master") as string[];
    // terrifying
    const quantities: number[] = (data.getAll("quantity") as string[]).map(
      (quantityString) => Number(quantityString),
    );

    try {
      setIsLoading(true);
      const deliveryID: string = await insertNewDeliveryOrder(
        selectedSupplierID,
        ref,
        date,
      );
      if (deliveryID === "") {
        console.error("Delivery Order tuple ID is already inside database.");
        alert("Delivery Order tuple ID is already inside database.");
        return;
      }
      const newTransactions: transactionInsert[] = [];
      for (let i = 0; i < masters.length; i++) {
        console.log(i);
        newTransactions.push({
          logger_id: session.user.id,
          delivery_id: deliveryID,
          product_id: masters[i],
          quantity_changed: quantities[i],
        });
      }

      const isInsertSuccessful = await insertBulkTransactions(newTransactions);
      if (!isInsertSuccessful) throw new Error("Bulk insertion failed");

      const isUpdateSuccessful = await updateQuantities(newTransactions);
      if (!isUpdateSuccessful) throw new Error("Update quantity failed");
    } catch (e) {
      console.error(e);
      return;
    } finally {
      setIsLoading(false);
    }

    alert("DO added :)");
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
          if (currentQuantity === null) {
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
    <form onSubmit={handleSubmit} autoComplete="off">
      <Typography variant="h5">Add Delivery Order</Typography>
      <Typography variant="h6">Delivery Order Info</Typography>
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
      <AutocompleteComponent
        label="Supplier"
        optionsArray={suppliers}
        databaseInsert={insertNewSupplier}
        returnIDAsValue={setSelectedSupplierID}
        isRequired={true}
      />
      <TextField label="Ref" required fullWidth margin="normal" name="ref" />
      <hr />
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Items
      </Typography>
      <AddItemElement />
    </form>
  );
}
