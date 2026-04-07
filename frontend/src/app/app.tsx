import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import type { product } from "../types/supabase";
import "bulma/css/bulma.min.css";
import styles from "./app.module.css";
import ProductLog from "../features/product-log/product-log";

type QuantityUpdateData = {
    id: number;
    previousQuantity: number;
    changeInValue: number;
};

function App() {
    const [products, setProducts] = useState<product[]>([]);

    useEffect(() => {
        async function getProducts() {
            const { error, data } = await supabase
                .from("products")
                .select(`*, product_categories(name)`)
                .order("id", { ascending: true });
            if (error) {
                console.error("Error retrieving products: ", error);
                return;
            }
            setProducts(data);
        }
        getProducts();
    }, []);

    function handleFormSubmission(formData: FormData) {
        const data: QuantityUpdateData = {
            id: Number(formData.get("id")),
            previousQuantity: Number(formData.get("previousQuantity")),
            changeInValue: Number(formData.get("changeInValue")),
        };
        handleQuantityUpdate(data);
    }

    async function handleQuantityUpdate({
        id,
        previousQuantity,
        changeInValue,
    }: QuantityUpdateData) {
        if (changeInValue == 0) return;
        const newQuantity: number = previousQuantity + changeInValue;
        if (newQuantity < 0) {
            alert("Quantity will go negative.");
            return;
        }

        const { error } = await supabase
            .from("products")
            .update({ initial_quantity: newQuantity })
            .eq("id", id);
        if (error) {
            console.error("Error updating product quantity: ", error);
            return;
        }
        window.location.reload();
    }

    const productList = products.map((product) => (
        <tr key={product.id}>
            <th scope="row" className={styles.smallerTh}>
                {product.id}
            </th>
            <th>{product.name}</th>
            <th>
                {product.photo_paths.map((path, key) => (
                    <img
                        src={path}
                        alt="MISSING IMAGE"
                        key={key}
                        className={styles.productPhoto}
                    />
                ))}
            </th>
            <th>${product.cost}</th>
            <th>
                <a href={product.url}>{product.url}</a>
            </th>
            <th>{product.product_categories?.name}</th>
            <th className={styles.smallerTh}>{product.initial_quantity}</th>
            <th>
                <form action={handleFormSubmission}>
                    <input type="hidden" name="id" value={product.id} />
                    <input
                        type="hidden"
                        name="previousQuantity"
                        value={product.initial_quantity}
                    />
                    <input
                        type="number"
                        name="changeInValue"
                        max="10"
                        min={`-${product.initial_quantity}`}
                        placeholder="0"
                        required
                        className="input mb-1"
                    />
                    <input
                        type="submit"
                        value="Update"
                        className="button is-white"
                    />
                </form>
            </th>
        </tr>
    ));

    return (
        <main className="grid">
            <table className="table is-bordered is-narrow is-hoverable is-full-width cell">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col" className={styles.smallerTh}>
                            Master
                        </th>
                        <th scope="col">Name</th>
                        <th scope="col">Photos</th>
                        <th scope="col">Cost</th>
                        <th scope="col">URL</th>
                        <th scope="col">Category</th>
                        <th scope="col" className={styles.smallerTh}>
                            Quant
                        </th>
                        <th scope="col">Modify</th>
                    </tr>
                </thead>
                <tbody>{productList}</tbody>
            </table>
            <ProductLog />
        </main>
    );
}

export default App;
