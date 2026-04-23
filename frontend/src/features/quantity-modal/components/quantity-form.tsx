import { InputAdornment, Stack, TextField, Typography } from "@mui/material";
import AutocompleteComponent from "lib/components/autocomplete-component";
import { RoleContext, SessionContext } from "lib/context/context";
import {
  getDeliveryOrderIDByOrderIDAndDate,
  insertNewDeliveryOrder,
} from "lib/database/delivery-orders-api";
import { updateProductQuantity } from "lib/database/products-api";
import { getAllSuppliers, insertNewSupplier } from "lib/database/suppliers-api";
import { insertNewTransaction } from "lib/database/transactions-api";
import { useContext, useEffect, useState } from "react";
import type { supplier } from "types/supabase";

interface props {
  selectedProductID: string;
  selectedProductQuantity: number;
  closeModal: () => void;
}

function QuantityForm({
  selectedProductID,
  selectedProductQuantity,
  closeModal,
}: props) {
  const session = useContext(SessionContext);
  const role = useContext(RoleContext);

  const [suppliers, setSuppliers] = useState<supplier[]>([]);
  useEffect(() => {
    async function fetchSuppliers(): Promise<void> {
      const suppliersArray = await getAllSuppliers();
      setSuppliers(suppliersArray);
    }
    fetchSuppliers();
  }, []);

  async function handleFormSubmission(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    closeModal();
    if (!session) {
      console.error("Session is missing");
      return;
    }
    const data = new FormData(e.target);

    let quantityChange = Number(data.get("quantityChange"));
    const orderID = data.get("doNumber") as string;
    const orderDate = new Date(Date.parse(data.get("doDate") as string));

    if (role === "Procurement") {
      //Check if there is already a delivery order
      let deliveryID = await getDeliveryOrderIDByOrderIDAndDate(
        orderID,
        orderDate,
      );

      //If not, insert a new one
      if (deliveryID == null || deliveryID === "") {
        deliveryID = await insertNewDeliveryOrder(
          selectedSupplierID,
          orderID,
          orderDate,
        );
      }

      insertNewTransaction(
        session.user.id,
        selectedProductID,
        quantityChange,
        deliveryID,
      );
    } else {
      quantityChange *= -1;
      insertNewTransaction(session.user.id, selectedProductID, quantityChange);
    }
    const newQuantity = validateQuantityInput(
      selectedProductQuantity,
      quantityChange,
    );
    updateProductQuantity(selectedProductID, newQuantity);
  }

  function validateQuantityInput(
    currentQuantity: number,
    quantityChange: number,
  ): number {
    const newQuantity = currentQuantity + quantityChange;
    return newQuantity;
  }

  const [selectedSupplierID, setSelectedSupplierID] = useState("");

  return (
    <form onSubmit={handleFormSubmission} id="quantity-form" autoComplete="off">
      <Stack spacing={2}>
        <TextField
          fullWidth
          autoFocus
          required
          label="Quantity change"
          type="number"
          name="quantityChange"
          slotProps={{
            htmlInput: { min: 1, step: 1 },
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  {role === "Procurement" ? "+" : "-"}
                </InputAdornment>
              ),
            },
          }}
        />
        {role === "Procurement" && (
          <>
            <Typography variant="h6">Delivery Order</Typography>
            <TextField
              required
              label="DO Number"
              placeholder="e.g. 2604013"
              name="doNumber"
            />
            <TextField
              required
              type="date"
              label="Delivery Date"
              slotProps={{ inputLabel: { shrink: true } }}
              defaultValue={new Date().toISOString().split("T")[0]}
              name="doDate"
            />
            <AutocompleteComponent
              label="Supplier"
              optionsArray={suppliers}
              databaseInsert={insertNewSupplier}
              returnIDAsValue={setSelectedSupplierID}
              isRequired={true}
            />
          </>
        )}
      </Stack>
    </form>
  );
}

export default QuantityForm;
