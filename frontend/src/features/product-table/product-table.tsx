import { useState, useEffect } from "react";
import type { product } from "types/supabase";
import ProductRow from "./components/product-row";
import { sortProductsIntoEnabledDisabled } from "./lib/sortProducts";
import { getAllProducts } from "./lib/supabase-calls";

function ProductTable() {
    const [enabledProducts, setEnabledProducts] = useState<product[]>([]);
    const [disabledProducts, setDisabledProducts] = useState<product[]>([]);

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
        <table className="table is-bordered is-narrow is-hoverable is-full-width cell">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">Master</th>
                    <th scope="col">Name</th>
                    <th scope="col">Photos</th>
                    <th scope="col">Category</th>
                    <th scope="col">Quant</th>
                    <th scope="col">Modify</th>
                </tr>
            </thead>
            <tbody>
                {enabledProducts.map((product) => (
                    <ProductRow product={product} key={product.masterID} />
                ))}
                {disabledProducts.map((product) => (
                    <ProductRow product={product} key={product.masterID} />
                ))}
            </tbody>
        </table>
    );
}

export default ProductTable;
