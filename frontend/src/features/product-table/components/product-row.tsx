import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, TableCell, TableRow, Typography } from "@mui/material";
import { FilterContext } from "lib/context/context";
import { deleteItem } from "lib/database/products-api";
import { truncateStringEllipsis } from "lib/miscellaneous";
import { useContext, useState } from "react";
import type { product } from "types/supabase";
import ProductImage from "./product-image";

interface props {
  product: product;
  handleProductSelection: (
    productID: string,
    productName: string,
    productQuantity: number,
  ) => void;
}

function ProductRow({ product }: props) {
  const { setFilter, setFilterArg } = useContext(FilterContext);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  function handleFilterByMasterID() {
    setFilter("productid");
    setFilterArg(product.masterID);
  }

  async function handleDeleteItem(masterID: string) {
    const isDeleted = await deleteItem(masterID);
    setIsDeleted(isDeleted);
  }

  if (isDeleted) return;

  return (
    <TableRow className={product.isDisabled ? "disabled-row" : ""}>
      <TableCell>
        <Typography variant="h3">{product.masterID}</Typography>
      </TableCell>
      <TableCell sx={{ maxWidth: "200px" }}>
        <button
          className="unset"
          onClick={handleFilterByMasterID}
          style={{ cursor: "pointer" }}
          type="button"
        >
          {truncateStringEllipsis(product.name, 110)}
        </button>
      </TableCell>
      <TableCell>
        {product.photoUrls[0] && (
          <ProductImage name={product.name} photoUrls={product.photoUrls} />
        )}
      </TableCell>
      <TableCell>
        {product.category
          ? truncateStringEllipsis(product.category.name, 20)
          : ""}
      </TableCell>
      <TableCell align="right">{product.quantity}</TableCell>
      <TableCell>
        <IconButton onClick={() => handleDeleteItem(product.masterID)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default ProductRow;
