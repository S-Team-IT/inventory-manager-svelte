import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from "@mui/material";
import { RoleContext } from "lib/context/context";
import { useContext } from "react";
import QuantityForm from "./quantity-form";

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
    const role = useContext(RoleContext);

    return (
        <Dialog onClose={handleCloseModal} open={modalIsOpen}>
            <DialogTitle component="div">
                <Typography variant="h6">
                    {role == "Procurement" && "Add Quantity"}
                    {role == "Project" && "Remove Quantity"}
                </Typography>
                <Typography variant="subtitle2">
                    You are modifying: {selectedProductID}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <QuantityForm
                    selectedProductID={selectedProductID}
                    selectedProductQuantity={selectedProductQuantity}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseModal}>Cancel</Button>
                <Button
                    type="submit"
                    form="quantity-form"
                    variant="contained"
                    color="primary"
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default QuantityModal;
