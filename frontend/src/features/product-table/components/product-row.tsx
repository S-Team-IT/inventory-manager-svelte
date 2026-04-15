import { Button, ImageList, ImageListItem, TableCell, TableRow } from "@mui/material";
import { RoleContext } from "lib/context/context";
import { truncateStringEllipsis } from "lib/miscellaneous";
import { useContext } from "react";
import type { product } from "types/supabase";

interface props {
  product: product;
  handleProductSelection: (productID: string, productName: string, productQuantity: number) => void;
}

function ProductRow({ product, handleProductSelection }: props) {
  const role = useContext(RoleContext);

  return (
    <TableRow className={product.isDisabled ? "disabled-row" : ""}>
      <TableCell>{product.masterID}</TableCell>
      <TableCell>{truncateStringEllipsis(product.name, 20)}</TableCell>
      <TableCell>
        <ImageList cols={1} sx={{ width: "150px" }}>
          <ImageListItem>
            <img src="product_photos/mock/test1.jpg" alt="" />
          </ImageListItem>
        </ImageList>
      </TableCell>
      <TableCell>{truncateStringEllipsis(product.category.name, 10)}</TableCell>
      <TableCell align="right">{product.quantity}</TableCell>
      <TableCell>
        {(role == "Procurement" || role == "Project") && !product.isDisabled && (
          <Button
            variant="outlined"
            onClick={() => handleProductSelection(product.masterID, product.name, product.quantity)}
          >
            Modify
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}

export default ProductRow;
