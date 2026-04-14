import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { RoleContext } from "lib/context/context";
import { getAllProducts } from "lib/database/products-api";
import { useContext, useEffect, useState } from "react";
import type { product } from "types/supabase";
import QuantityModal from "../quantity-modal/quantity-modal";
import ProductRow from "./components/product-row";
import { sortProductsIntoEnabledDisabled } from "./lib/sortProducts";

function ProductTable() {
    const role = useContext(RoleContext);

    const [enabledProducts, setEnabledProducts] = useState<product[]>([]);
    const [disabledProducts, setDisabledProducts] = useState<product[]>([]);

    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedProductID, setSelectedProductID] = useState("");
    const [selectedProductQuantity, setSelectedProductQuantity] = useState(0);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function onSelectProduct(productID: string, productQuantity: number) {
        setSelectedProductID(productID);
        setSelectedProductQuantity(productQuantity);
        openModal();
    }

    useEffect(() => {
        async function fetchProducts() {
            const productArray = await getAllProducts();
            const sortedProductArray =
                sortProductsIntoEnabledDisabled(productArray);
            setEnabledProducts(sortedProductArray[0]);
            setDisabledProducts(sortedProductArray[1]);
        }
        fetchProducts();
    }, []);

    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Master Number</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Photos</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Quantity</TableCell>
                            {(role == "Procurement" || role == "Project") && (
                                <TableCell>Modify</TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {enabledProducts.map((product) => (
                            <ProductRow
                                product={product}
                                key={product.masterID}
                                handleProductSelection={onSelectProduct}
                            />
                        ))}
                        {disabledProducts.map((product) => (
                            <ProductRow
                                product={product}
                                key={product.masterID}
                                handleProductSelection={onSelectProduct}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <QuantityModal
                selectedProductID={selectedProductID}
                selectedProductQuantity={selectedProductQuantity}
                modalIsOpen={modalIsOpen}
                handleCloseModal={closeModal}
            />
        </>
    );
}

export default ProductTable;
