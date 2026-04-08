import type { product } from "types/supabase";
import { supabase } from "lib/supabase";

type QuantityUpdateData = {
    id: number;
    previousQuantity: number;
    changeInValue: number;
};

function ProductRow({ product }: { product: product }) {
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

    return (
        <tr key={product.id}>
            <th scope="row">{product.id}</th>
            <th>{product.name}</th>
            <th>
                {product.photo_paths.map((path, key) => (
                    <img src={path} alt="MISSING IMAGE" key={key} />
                ))}
            </th>
            <th>${product.cost}</th>
            <th>
                <a href={product.url}>{product.url}</a>
            </th>
            <th>{product.product_categories?.name}</th>
            <th>{product.initial_quantity}</th>
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
    );
}

export default ProductRow;
