import { Button, Stack, TextField, Typography } from "@mui/material";
import imageCompression from "browser-image-compression";
import { uploadImage } from "lib/database/storage-api";
import { MuiFileInput } from "mui-file-input";
import { useState } from "react";

const options = {
  maxSizeMB: 0.08,
  maxWidthOrHeight: 300,
  useWebWorker: true,
};

function AddProductForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  //MuiFileInput returns the file directly instead of an event
  function handleFilesChange(files: File[]) {
    if (files) {
      setFiles(files);
    }
  }

  async function handleFormSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (files) {
      files.forEach(async (file) => {
        const compressedFile = await imageCompression(file, options);
        const url = await uploadImage(compressedFile);
        if (!url) return;
        setImageUrls((prev) => [...prev, url]);
      });
    }
  }

  return (
    <>
      {imageUrls.map((url) => (
        <img src={url} key={url} />
      ))}
      <form onSubmit={handleFormSubmit}>
        <Stack spacing={2}>
          <Typography variant="h6">Add a new Product</Typography>
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
            name="files"
            multiple
            value={files}
            onChange={handleFilesChange}
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
