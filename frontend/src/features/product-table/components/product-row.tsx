import { RoleContext } from "lib/context/context";
import { useContext } from "react";
import type { product } from "types/supabase";

interface props {
    product: product;
    handleProductSelection: (
        productID: string,
        productQuantity: number,
    ) => void;
    isDisabled: boolean;
}

function ProductRow({ product, handleProductSelection, isDisabled }: props) {
    const session = useContext(RoleContext);

    return (
        <tr className={product.isDisabled ? "strike-through" : ""}>
            <th scope="row">{product.masterID}</th>
            <th>{product.name}</th>
            <th>
                {/* {product.photoPaths.map((path, key) => (
                    <img src={path} alt="MISSING IMAGE" key={key} />
                ))} */}
            </th>
            <th>{product.category?.name}</th>
            <th>{product.quantity}</th>
            {session && (
                <th>
                    {!isDisabled && (
                        <button
                            className="button is-primary"
                            onClick={() =>
                                handleProductSelection(
                                    product.masterID,
                                    product.quantity,
                                )
                            }
                        >
                            Modify
                        </button>
                    )}
                </th>
            )}
        </tr>
    );
}

export default ProductRow;
