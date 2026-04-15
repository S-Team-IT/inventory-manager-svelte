import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { convertToSGTime } from "lib/format-dates";
import type { deliveryOrder, transaction } from "types/supabase";

interface props {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  transactionData: transaction;
  deliveryOrderData?: deliveryOrder;
}

function TransactionCardModal({
  isModalOpen,
  handleCloseModal,
  transactionData,
  deliveryOrderData,
}: props) {
  const sgDateTime = convertToSGTime(transactionData.creationTimestamp);
  const formattedDateTimeString = format(sgDateTime, "dd/MM/yyyy hh:mm a");

  return (
    <Dialog onClose={handleCloseModal} open={isModalOpen}>
      <DialogTitle component="div">
        <Typography variant="h6">
          {transactionData.quantityChanged > 0 ? "Incoming" : "Outgoing"}
        </Typography>
        <Typography variant="subtitle2">{transactionData.product.name}</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography>
          {transactionData.logger.firstName}{" "}
          {transactionData.quantityChanged > 0 ? "added" : "removed"}{" "}
          {Math.abs(transactionData.quantityChanged)}
        </Typography>
        <Typography>{formattedDateTimeString}</Typography>
        {deliveryOrderData && (
          <>
            <Divider />
            <Box>
              <Typography>{deliveryOrderData.orderID}</Typography>{" "}
              <Typography>{deliveryOrderData.orderDate.toString()}</Typography>
              <Typography>{deliveryOrderData.supplier.name}</Typography>
            </Box>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default TransactionCardModal;
