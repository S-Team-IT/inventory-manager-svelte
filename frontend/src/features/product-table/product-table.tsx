import { useState, useEffect, useContext } from "react";
import type { product } from "types/supabase";
import ProductRow from "./components/product-row";
import { sortProductsIntoEnabledDisabled } from "./lib/sortProducts";
import { getAllProducts } from "lib/database/products-api";
import QuantityModal from "../quantity-modal/quantity-modal";
import { SessionContext } from "lib/context/context";

function ProductTable() {
    const session = useContext(SessionContext);

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
        <section>
            <table className="table is-bordered is-narrow is-hoverable is-full-width column">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Master</th>
                        <th scope="col">Name</th>
                        <th scope="col">Photos</th>
                        <th scope="col">Category</th>
                        <th scope="col">Quant</th>
                        {session && <th scope="col"></th>}
                    </tr>
                </thead>
                <tbody>
                    {enabledProducts.map((product) => (
                        <ProductRow
                            product={product}
                            key={product.masterID}
                            handleProductSelection={onSelectProduct}
                            isDisabled={false}
                        />
                    ))}
                    {disabledProducts.map((product) => (
                        <ProductRow
                            product={product}
                            key={product.masterID}
                            handleProductSelection={onSelectProduct}
                            isDisabled={true}
                        />
                    ))}
                </tbody>
            </table>
            <QuantityModal
                selectedProductID={selectedProductID}
                selectedProductQuantity={selectedProductQuantity}
                modalIsOpen={modalIsOpen}
                handleCloseModal={closeModal}
            />
        </section>
    );
}

export default ProductTable;
