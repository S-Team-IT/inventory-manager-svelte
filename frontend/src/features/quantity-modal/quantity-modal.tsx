import { useState, useEffect } from "react";
import Modal from "react-modal";
import { getAllSuppliers } from "lib/suppliers-api";
import type { supplier } from "types/supabase";
import DeliveryOrderFieldset from "./components/delivery-order-fieldset";
import { updateProductQuantity } from "lib/products-api";
import { insertNewTransaction } from "lib/transactions-api";
import { insertNewDeliveryOrder } from "lib/delivery-order-api";

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
    selectedProductID: string;
    modalIsOpen: boolean;
    handleCloseModal: () => void;
}

function QuantityModal({
    selectedProductID,
    modalIsOpen,
    handleCloseModal,
}: props) {
    const [suppliers, setSuppliers] = useState<supplier[]>([]);
    const [isIncomingOrder, setIsIncomingOrder] = useState(true);

    useEffect(() => {
        async function fetchSuppliers(): Promise<void> {
            const suppliersArray = await getAllSuppliers();
            setSuppliers(suppliersArray);
        }
        fetchSuppliers();
    }, []);

    async function handleFormSubmission(formData: FormData) {
        const operation = formData.get("operation") as string;
        const quantityChange = Number(formData.get("quantityChange"));
        const orderID = formData.get("orderID") as string;
        const orderDate = new Date(
            Date.parse(formData.get("orderDate") as string),
        );
        const loggerID = "4";
        const supplierID = formData.get("supplierID") as string;

        if (operation == "+") {
            const deliveryID = await insertNewDeliveryOrder(
                supplierID,
                orderID,
                orderDate,
            );

            insertNewTransaction(
                loggerID,
                selectedProductID,
                quantityChange,
                deliveryID,
            );

            updateProductQuantity(selectedProductID, quantityChange);
        } else if (operation == "-") {
            insertNewTransaction(
                loggerID,
                selectedProductID,
                quantityChange * -1,
            );
            updateProductQuantity(selectedProductID, quantityChange);
        } else {
            console.error(
                "How did you get here? No valid operation option submitted",
            );
        }
    }

    function handleOperationChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setIsIncomingOrder(e.target.value == "+");
    }

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={handleCloseModal}
            contentLabel="Delivery Order Form"
            style={modalStyles}
        >
            <form action={handleFormSubmission}>
                <input
                    type="hidden"
                    name="masterID"
                    value={selectedProductID}
                />
                <fieldset>
                    <div className="field">
                        <label className="label" htmlFor="quantityChange">
                            Quantity:
                        </label>
                        <div className="field has-addons">
                            <p className="control">
                                <span className="select">
                                    <select
                                        name="operation"
                                        id="operation"
                                        onChange={handleOperationChange}
                                    >
                                        <option value="+">+</option>
                                        <option value="-">-</option>
                                    </select>
                                </span>
                            </p>
                            <div className="control">
                                <input
                                    type="number"
                                    className="input"
                                    name="quantityChange"
                                    placeholder="0"
                                    required
                                    step="1"
                                    min="1"
                                    id="quantityChange"
                                />
                            </div>
                        </div>
                    </div>
                </fieldset>
                <hr />
                {isIncomingOrder ? (
                    <fieldset>
                        <DeliveryOrderFieldset suppliers={suppliers} />
                    </fieldset>
                ) : (
                    <fieldset disabled>
                        <DeliveryOrderFieldset suppliers={suppliers} />
                    </fieldset>
                )}
                <div className="field is-grouped">
                    <div className="control">
                        <button type="submit" className="button is-primary">
                            Submit
                        </button>
                    </div>
                    <div className="control">
                        <button className="button" onClick={handleCloseModal}>
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </Modal>
    );
}

export default QuantityModal;

// async function handleDeliveryOrderForm(formData: FormData) {
//     // closeModal();
//     const deliveryID = formData.get("deliveryID") as string;
//     const deliveryDate = new Date(
//         Date.parse(formData.get("deliveryDate") as string),
//     );
//     await insertDeliveryOrder(deliveryID, deliveryDate);
// }
