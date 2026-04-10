import { useState, useEffect } from "react";
import type { product } from "types/supabase";
import ProductRow from "./components/product-row";
import { sortProductsIntoEnabledDisabled } from "./lib/sortProducts";
import { getAllProducts } from "lib/products-api";
import QuantityModal from "../quantity-modal/quantity-modal";

function ProductTable() {
    const [enabledProducts, setEnabledProducts] = useState<product[]>([]);
    const [disabledProducts, setDisabledProducts] = useState<product[]>([]);

    const [modalIsOpen, setIsOpen] = useState(false);
    // const [selectedProductData, setSelectedProductData] = useState();

    function openModal(productID: string) {
        console.log("productID: ", productID);
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    // function handleSelectProduct(data: any) {
    //     setSelectedProductData(data);
    // }

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
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {enabledProducts.map((product) => (
                        <ProductRow
                            product={product}
                            key={product.masterID}
                            handleQuantityChange={openModal}
                        />
                    ))}
                    {disabledProducts.map((product) => (
                        <ProductRow
                            product={product}
                            key={product.masterID}
                            handleQuantityChange={openModal}
                        />
                    ))}
                </tbody>
            </table>
            <QuantityModal
                modalIsOpen={modalIsOpen}
                handleCloseModal={closeModal}
            />
        </section>
    );
}

export default ProductTable;
