import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import imageCompression from "browser-image-compression";
import AutocompleteComponent from "lib/components/autocomplete-component";
import {
  getAllProductCategories,
  insertNewCategory,
} from "lib/database/categories-api";
import { insertNewProduct } from "lib/database/products-api";
import { uploadImage } from "lib/database/storage-api";
import { useEffect, useState } from "react";
import type { category, photoObj, productInsert } from "types/supabase";
import Loading from "../../app/misc/loading";

const options = {
  maxSizeMB: 0.1,
  maxWidthOrHeight: 600,
  useWebWorker: true,
};

function AddProductForm() {
  const [productCategories, setProductCategories] = useState<category[]>([]);
  const [selectedCategoryID, setSelectedCategoryID] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      const categoryArray = await getAllProductCategories();
      setProductCategories(categoryArray);
    }
    fetchCategories();
  }, []);

  async function handleFormSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    let success;
    try {
      if (selectedCategoryID === "") {
        console.error("no category selected");
        alert(`Error, try clicking "Add" in the Category Input`);
        return;
      }

      const formData = new FormData(e.target);
      console.log(formData);

      const masterID = formData.get("masterID") as string;
      const productName = formData.get("name") as string;
      const categoryID = selectedCategoryID;

      const initialQuantity = Number(formData.get("quantity"));
      const productPhotos = formData.getAll("img") as File[];
      const isDisabled = formData.get("disabled") === "on";

      const imageUrls: photoObj[] = [];

      //I don't know why it doesnt just return a null or whatever but when there are no files selected, this is returned and must be accounted for.
      if (productPhotos[0].type !== "application/octet-stream") {
        // forEach cannot be asynchronous... ts cost me an hour of my life
        const uploadPromises = productPhotos.map(async (file) => {
          // console.log("Original file size: ", (file.size / 1024 / 1024).toFixed(2) + "MB");
          const compressedFile = await imageCompression(file, options);
          // console.log("Compressed size: ", (compressedFile.size / 1024 / 1024).toFixed(2) + "MB");
          const url = await uploadImage(compressedFile);
          if (url) imageUrls.push({ item: url });
        });

        await Promise.all(uploadPromises);
      }

      const newProduct: productInsert = {
        master_id: masterID,
        name: productName,
        photo_paths: imageUrls,
        category_id: categoryID,
        initial_quantity: initialQuantity,
        disabled: isDisabled,
      };

      success = await insertNewProduct(newProduct);
    } catch {
    } finally {
      setIsLoading(false);
    }
    if (success) {
      alert("Item has been added to the inventory.");
    } else {
      alert("Item has not been added.");
    }
  }

  function handleCategoryIDChange(id: string) {
    setSelectedCategoryID(id);
  }

  if (isLoading) return <Loading />;

  return (
    <form onSubmit={handleFormSubmit} autoComplete="off">
      <Stack spacing={2}>
        <Typography variant="h6">Add a new Product</Typography>
        <TextField label="Master No. " required name="masterID" />
        <TextField label="Name" required name="name" />
        <AutocompleteComponent
          label="Category"
          optionsArray={productCategories}
          databaseInsert={insertNewCategory}
          returnIDAsValue={handleCategoryIDChange}
        />
        <TextField
          label="Quantity"
          type="number"
          required
          name="quantity"
          slotProps={{ htmlInput: { min: 0, step: 1 } }}
        />
        <FormControlLabel
          control={<Checkbox name="disabled" />}
          label="Disabled"
        />
        <Button
          component="label"
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
