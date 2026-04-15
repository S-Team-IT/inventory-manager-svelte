import { Button, Stack, TextField } from "@mui/material";
import { uploadImage } from "lib/database/storage-api";
import { MuiFileInput } from "mui-file-input";
import { useState } from "react";

function AddProductForm() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  //MuiFileInput returns the file directly instead of an event
  function handleFileChange(file: File | null) {
    if (file) {
      setFile(file);
    }
  }

  async function handleFormSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (file) {
      const url = await uploadImage(file);
      setImageUrl(url);
    }
  }

  return (
    <>
      <img src={imageUrl ? imageUrl : ""} alt="image" />
      <form onSubmit={handleFormSubmit}>
        <Stack spacing={2}>
          <TextField label="Name" required name="name" />
          <TextField label="Category" required name="category" />
          <TextField
            label="Quantity"
            type="number"
            required
            name="quantity"
            slotProps={{ htmlInput: { min: 0, step: 1 } }}
          />
          <MuiFileInput
            name="file"
            value={file}
            onChange={handleFileChange}
            slotProps={{ htmlInput: { accept: "image/*" } }}
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </form>
    </>
  );
}

export default AddProductForm;
