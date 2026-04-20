import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import imageCompression from "browser-image-compression";
import { getAllProductCategories } from "lib/database/categories-api";
import { insertNewProduct } from "lib/database/products-api";
import { uploadImage } from "lib/database/storage-api";
import { useEffect, useState } from "react";
import type { category, productInsert } from "types/supabase";

const options = {
  maxSizeMB: 0.1,
  maxWidthOrHeight: 600,
  useWebWorker: true,
};

function AddProductForm() {
  const [productCategories, setProductCategories] = useState<category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const categoryArray = await getAllProductCategories();
      setProductCategories(categoryArray);
    }
    fetchCategories();
  }, []);

  async function handleFormSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const productName = formData.get("name") as string;
    const categoryID = Number(formData.get("categoryID"));

    const initialQuantity = Number(formData.get("quantity"));
    const productPhotos = formData.getAll("img") as File[];

    const imageUrls: string[] = [];

    if (productPhotos.length > 0) {
      // forEach cannot be asynchronous... ts cost me an hour of my life
      const uploadPromises = productPhotos.map(async (file) => {
        // console.log("Original file size: ", (file.size / 1024 / 1024).toFixed(2) + "MB");
        const compressedFile = await imageCompression(file, options);
        // console.log("Compressed size: ", (compressedFile.size / 1024 / 1024).toFixed(2) + "MB");
        const url = await uploadImage(compressedFile);
        if (url) imageUrls.push(url);
      });

      await Promise.all(uploadPromises);
    }

    const newProduct: productInsert = {
      product_id: Math.floor(Math.random() * 10000 + 1).toString(),
      master_id: Math.floor(Math.random() * 10000 + 1).toString(),
      name: productName,
      photo_paths: imageUrls,
      category_id: categoryID,
      supplier_id: 1,
      initial_quantity: initialQuantity,
      current_quantity: initialQuantity,
      disabled: false,
    };

    await insertNewProduct(newProduct);
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <Stack spacing={2}>
        <Typography variant="h6">Add a new Product</Typography>
        <TextField label="Name" required name="name" />
        <FormControl>
          <InputLabel>Category</InputLabel>
          <Select label="Category" name="categoryID" defaultValue="">
            {productCategories.map(({ id, name }) => (
              <MenuItem value={id} key={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Quantity"
          type="number"
          required
          name="quantity"
          slotProps={{ htmlInput: { min: 0, step: 1 } }}
        />
        <Button
          component="label"
          role={undefined}
          variant="contained"
          color="secondary"
          tabIndex={-1}
          size="large"
        >
          <input type="file" multiple name="img" accept="image/*" />
        </Button>
        <Button type="submit" variant="contained" size="large">
          Submit
        </Button>
      </Stack>
    </form>
  );
}

export default AddProductForm;
