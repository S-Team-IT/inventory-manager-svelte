import type { product } from "types/supabase";
import { updateProductQuantity } from "../lib/products-api";

function ProductRow({ product }: { product: product }) {
    async function handleFormSubmission(formData: FormData) {
        const masterID = formData.get("id") as string;
        const previousQuantity = Number(formData.get("previousQuantity"));
        const changeInValue = Number(formData.get("changeInValue"));

        if (changeInValue == 0) {
            alert("Cannot be 0.");
            return;
        }

        const newQuantity = previousQuantity + changeInValue;
        if (newQuantity < 0) {
            alert("Quantity will go negative.");
            return;
        }

        const success = await updateProductQuantity(masterID, newQuantity);
        if (success) {
            alert("Updated!");
            window.location.reload();
        } else {
            alert("Failed to update. Please try again.");
        }
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
                                    step="1"
                                />
                            </div>
                            <div className="control">
                                <input
                                    type="submit"
                                    value="Update"
                                    className="button is-primary"
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
