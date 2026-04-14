import { RoleContext } from "lib/context/context";
import { useContext } from "react";
import type { product } from "types/supabase";
import { truncateStringEllipsis } from "lib/miscellaneous";
import {
    TableRow,
    TableCell,
    Button,
    ImageList,
    ImageListItem,
} from "@mui/material";

interface props {
    product: product;
    handleProductSelection: (
        productID: string,
        productQuantity: number,
    ) => void;
}

function ProductRow({ product, handleProductSelection }: props) {
    const role = useContext(RoleContext);

    return (
        <TableRow className={product.isDisabled ? "disabled-row" : ""}>
            <TableCell>{product.masterID}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>
                <ImageList cols={3} sx={{ width: "300px" }}>
                    <ImageListItem>
                        <img src="product_photos/mock/test1.jpg" alt="" />
                    </ImageListItem>
                    <ImageListItem>
                        <img src="product_photos/mock/test2.jpg" alt="" />
                    </ImageListItem>
                    <ImageListItem>
                        <img src="product_photos/mock/test3.jpg" alt="" />
                    </ImageListItem>
                </ImageList>
            </TableCell>
            <TableCell>
                {truncateStringEllipsis(product.category.name, 20)}
            </TableCell>
            <TableCell align="right">{product.quantity}</TableCell>
            <TableCell>
                {(role == "Procurement" || role == "Project") &&
                    !product.isDisabled && (
                        <Button
                            variant="outlined"
                            onClick={() =>
                                handleProductSelection(
                                    product.masterID,
                                    product.quantity,
                                )
                            }
                        >
                            Modify
                        </Button>
                    )}
            </TableCell>
        </TableRow>
    );
}

export default ProductRow;
