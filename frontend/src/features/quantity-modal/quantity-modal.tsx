import { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import { getAllSuppliers } from "lib/database/suppliers-api";
import type { supplier } from "types/supabase";
import DeliveryOrderFieldset from "./components/delivery-order-fieldset";
import { updateProductQuantity } from "lib/database/products-api";
import { insertNewTransaction } from "lib/database/transactions-api";
import { insertNewDeliveryOrder } from "lib/database/delivery-order-api";
import { SessionContext } from "lib/context/session-context";

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
    selectedProductQuantity: number;
    modalIsOpen: boolean;
    handleCloseModal: () => void;
}

function QuantityModal({
    selectedProductID,
    selectedProductQuantity,
    modalIsOpen,
    handleCloseModal,
}: props) {
    const [suppliers, setSuppliers] = useState<supplier[]>([]);
    const [isIncomingOrder, setIsIncomingOrder] = useState(true);
    const [session, _setSession] = useContext(SessionContext);

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
        const supplierID = formData.get("supplierID") as string;
        const quantity = Number(formData.get("quantity"));

        if (operation == "+") {
            const deliveryID = await insertNewDeliveryOrder(
                supplierID,
                orderID,
                orderDate,
            );

            insertNewTransaction(
                session.user.id,
                selectedProductID,
                quantityChange,
                deliveryID,
            );

            const newQuantity = validateQuantityInput(quantity, quantityChange);
            updateProductQuantity(selectedProductID, newQuantity);
            window.location.reload();
        } else if (operation == "-") {
            insertNewTransaction(
                session.user.id,
                selectedProductID,
                quantityChange * -1,
            );
            const newQuantity = validateQuantityInput(
                quantity,
                quantityChange * -1,
            );
            updateProductQuantity(selectedProductID, newQuantity);
            window.location.reload();
        } else {
            console.error(
                "How did you get here? No valid operation option submitted",
            );
        }
    }

    function validateQuantityInput(
        currentQuantity: number,
        quantityChange: number,
    ): number {
        const newQuantity = currentQuantity + quantityChange;
        return newQuantity;
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
                <input
                    type="hidden"
                    name="quantity"
                    value={selectedProductQuantity}
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
                                    placeholder="1"
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
