import { List, Stack } from "@mui/material";
import { FilterContext } from "lib/context/context";
import { getDeliveryOrderByID } from "lib/database/delivery-orders-api";
import { supabase } from "lib/database/supabase";
import { getAllTransactions } from "lib/database/transactions-api";
import { useContext, useEffect, useState } from "react";
import type { deliveryOrder, transaction } from "types/supabase";
import TransactionCardModal from "./components/transaction-card-modal";
import TransactionMessage from "./components/transaction-message";
import { filterTransactionsByProductID } from "./lib/sortTransactions";

function TransactionLog() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<transaction>();
  const [selectedTransactionDeliveryOrder, setSelectedTransactionDeliveryOrder] =
    useState<deliveryOrder>();

  async function handleSelectTransaction(transaction: transaction) {
    setSelectedTransaction(transaction);
    setSelectedTransactionDeliveryOrder(undefined);
    if (transaction.deliveryID) {
      const selectedDeliverOrder = await getDeliveryOrderByID(transaction.deliveryID);
      setSelectedTransactionDeliveryOrder(selectedDeliverOrder[0]);
    }
  }

  const { filter, filterArg } = useContext(FilterContext);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  const [transactions, setTransactions] = useState<transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<transaction[]>([]);

  useEffect(() => {
    switch (filter) {
      case "none":
        setFilteredTransactions(transactions);
        break;
      case "productid":
        setFilteredTransactions(filterTransactionsByProductID(filterArg, transactions));
        break;
      default:
        console.error("Filter broke: ", filter);
        break;
    }
  }, [filter, filterArg, transactions]);

  async function fetchTransactions() {
    const transactions = await getAllTransactions();
    setTransactions(transactions);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    const channel = supabase.channel("transactions-channel");
    channel
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "transactions" },
        (_payload) => {
          console.log("hit");
          window.location.reload();
          //I don't know why payload.new's date is being read as an invalid date but it is so yeah,
          // just gonna force a fetch again yay!
          // const newTransaction = payload.new as transaction;
          // console.log(newTransaction);
          // console.log(transactions);
          // setTransactions((prev) => [...prev, newTransaction]);
        },
      )
      .subscribe();

    return () => {
      console.log("Cleaning up channel");
      channel.unsubscribe();
    };
  }, []);

  return (
    <>
      <List>
        <Stack>
          {filteredTransactions.length == 0 && <p>Nothing matches filters</p>}
          {filteredTransactions.length > 0 &&
            filteredTransactions.map((transaction) => (
              <TransactionMessage
                transaction={transaction}
                key={transaction.id}
                handleOpenModal={openModal}
                selectTransaction={handleSelectTransaction}
              />
            ))}
        </Stack>
      </List>

      {selectedTransaction && (
        <TransactionCardModal
          isModalOpen={isModalOpen}
          handleCloseModal={closeModal}
          transactionData={selectedTransaction}
          deliveryOrderData={selectedTransactionDeliveryOrder}
        />
      )}
    </>
  );
}

export default TransactionLog;
