import { format } from "date-fns";
import { convertToSGTime } from "lib/format-dates";
import Modal from "react-modal";
import type { deliveryOrder, transaction } from "types/supabase";

const modalStyles = {
  overlay: { backgroundColor: "rgb(255, 255, 255, 0.8)" },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

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
    <Modal
      isOpen={isModalOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Delivery Order Form"
      style={modalStyles}
    >
      <article>
        <h1 className="title">{transactionData.quantityChanged > 0 ? "Incoming" : "Outgoing"}</h1>
        <h2 className="subtitle mb-1">{transactionData.logger.firstName}</h2>
        <p>
          {Math.abs(transactionData.quantityChanged)} {transactionData.product.name}
        </p>
        <p>{formattedDateTimeString}</p>
        {deliveryOrderData && (
          <fieldset disabled>
            <hr className="mt-2 mb-2" />
            <div className="field">
              <label className="label" htmlFor="orderID">
                Delivery Order Number:
              </label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  name="orderID"
                  placeholder="DO Number"
                  required
                  id="orderID"
                  value={deliveryOrderData.orderID}
                  readOnly={true}
                />
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="orderDate">
                Delivery Date:
              </label>
              <div className="control">
                <input
                  type="date"
                  className="input"
                  name="orderDate"
                  required
                  id="orderDate"
                  value={deliveryOrderData.orderDate.toString()}
                  readOnly={true}
                />
              </div>
            </div>
            <div className="field mb-3">
              <label className="label" htmlFor="supplierID">
                Supplier
              </label>
              <div className="control">
                <div className="select">
                  <select name="supplierID" id="supplierID">
                    <option>{deliveryOrderData.supplier.name}</option>
                  </select>
                </div>
              </div>
            </div>
          </fieldset>
        )}
      </article>
    </Modal>
  );
}

export default TransactionCardModal;
