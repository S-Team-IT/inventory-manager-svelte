import { Divider, List, ListItemText, Stack, Typography } from "@mui/material";
import { convertToSGTime, formatRelativeToToday } from "lib/format-dates";
import type { transaction } from "types/supabase";

interface props {
  transaction: transaction;
  handleOpenModal: () => void;
  selectTransaction: (transaction: transaction) => void;
}

function TransactionCard({ transaction, handleOpenModal, selectTransaction }: props) {
  const sgDateTime = convertToSGTime(transaction.creationTimestamp);
  const relativeDateString = formatRelativeToToday(sgDateTime);

  function handleSelectTransaction(transaction: transaction) {
    //transaction squared
    selectTransaction(transaction);
    handleOpenModal();
  }

  return (
    <>
      <List component="article">
        <a onClick={() => handleSelectTransaction(transaction)}>
          <Stack direction="row">
            <ListItemText
              primary={`${
                transaction.quantityChanged > 0 ? "Incoming" : "Outgoing"
              } from ${transaction.logger.firstName}`}
              secondary={`${transaction.quantityChanged} ${transaction.product.name}`}
            ></ListItemText>
            <Typography align="right">{relativeDateString}</Typography>
          </Stack>
        </a>
      </List>
      <Divider />
    </>
  );
}

export default TransactionCard;
