import { Button, TableCell, TableRow } from "@mui/material";
import { FilterContext, RoleContext } from "lib/context/context";
import { truncateStringEllipsis } from "lib/miscellaneous";
import { useContext } from "react";
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

function ProductRow({ product, handleProductSelection }: props) {
  const role = useContext(RoleContext);
  const { setFilter, setFilterArg } = useContext(FilterContext);

  function handleFilterByMasterID() {
    setFilter("productid");
    setFilterArg(product.masterID);
  }

  return (
    <TableRow className={product.isDisabled ? "disabled-row" : ""}>
      <TableCell>{product.masterID}</TableCell>
      <TableCell>
        <button
          className="unset"
          onClick={handleFilterByMasterID}
          style={{ cursor: "pointer" }}
          type="button"
        >
          {truncateStringEllipsis(product.name, 20)}
        </button>
      </TableCell>
      <TableCell>
        {product.photoUrls[0] && (
          <ProductImage name={product.name} photoUrls={product.photoUrls} />
        )}
      </TableCell>
      <TableCell>{product.category ? truncateStringEllipsis(product.category.name, 10) : ""}</TableCell>
      <TableCell align="right">{product.quantity}</TableCell>
      <TableCell>
        {(role === "Procurement" || role === "Project") &&
          !product.isDisabled && (
            <Button
              variant="outlined"
              onClick={() =>
                handleProductSelection(
                  product.masterID,
                  product.name,
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
