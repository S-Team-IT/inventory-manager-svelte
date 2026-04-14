import { RoleContext } from "lib/context/context";
import { useContext } from "react";
import type { product } from "types/supabase";
import { truncateStringEllipsis } from "lib/miscellaneous";

interface props {
    product: product;
    handleProductSelection: (
        productID: string,
        productQuantity: number,
    ) => void;
    isDisabled: boolean;
}

function ProductRow({ product, handleProductSelection, isDisabled }: props) {
    const role = useContext(RoleContext);

    return (
        <tr className={product.isDisabled ? "strike-through" : ""}>
            <th scope="row">{product.masterID}</th>
            <th>{truncateStringEllipsis(product.name, 20)}</th>
            <th>
                {/* {product.photoPaths.map((path, key) => (
                    <img src={path} alt="MISSING IMAGE" key={key} />
                ))} */}
            </th>
            <th>{truncateStringEllipsis(product.category.name, 10)}</th>
            <th>{product.quantity}</th>
            {(role =="Procurement" || role == "Project") && (
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
