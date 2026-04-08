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
        <tr className={product.isDisabled ? "strike-through" : ""}>
            <th scope="row">{product.masterID}</th>
            <th>{product.name}</th>
            <th>
                {product.photoPaths.map((path, key) => (
                    <img src={path} alt="MISSING IMAGE" key={key} />
                ))}
            </th>
            <th>{product.category?.name}</th>
            <th>{product.quantity}</th>
            <th>
                {!product.isDisabled && (
                    <form action={handleFormSubmission}>
                        <input
                            type="hidden"
                            name="id"
                            value={product.masterID}
                        />
                        <input
                            type="hidden"
                            name="previousQuantity"
                            value={product.quantity}
                        />
                        <div className="field has-addons">
                            <div className="control">
                                <input
                                    type="number"
                                    name="changeInValue"
                                    max="10"
                                    min={`-${product.quantity}`}
                                    placeholder="0"
                                    required
                                    className="input"
                                />
                            </div>
                            <div className="control">
                                <input
                                    type="submit"
                                    value="Update"
                                    className="button is-white"
                                />
                            </div>
                        </div>
                    </form>
                )}
            </th>
        </tr>
    );
}

export default ProductRow;
