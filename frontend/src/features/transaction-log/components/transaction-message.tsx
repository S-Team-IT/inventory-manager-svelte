import { ListItem, ListItemText, Typography } from "@mui/material";
import { convertToSGTime, formatRelativeToToday } from "lib/format-dates";
import type { transaction } from "types/supabase";

interface props {
  transaction: transaction;
  handleOpenModal: () => void;
  selectTransaction: (transaction: transaction) => void;
}

function TransactionMessage({
  transaction,
  handleOpenModal,
  selectTransaction,
}: props) {
  const sgDateTime = convertToSGTime(transaction.creationTimestamp);
  const relativeDateString = formatRelativeToToday(sgDateTime);

  function handleSelectTransaction(transaction: transaction) {
    //transaction squared
    selectTransaction(transaction);
    handleOpenModal();
  }

  return (
    <button
      className="none"
      onClick={() => handleSelectTransaction(transaction)}
      type="button"
    >
      <ListItem>
        <ListItemText
          primary={`${transaction.quantityChanged > 0 ? "Incoming" : "Outgoing"} from ${transaction.logger.firstName}`}
          secondary={`${transaction.quantityChanged} ${transaction.product.name}`}
        ></ListItemText>
        <Typography align="right">{relativeDateString}</Typography>
      </ListItem>
    </button>
  );
}

export default TransactionMessage;
