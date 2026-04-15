import { Button, Stack, TextField } from "@mui/material";
import { supabase } from "lib/database/supabase";
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

  async function uploadImage(file: File): Promise<string | null> {
    const filePath = `${file.name}-${Date.now()}`;
    const { error } = await supabase.storage.from("product-images").upload(filePath, file);
    if (error) {
      console.error("Error uploading image: ", error);
      return null;
    }

    const { data } = await supabase.storage.from("product-images").getPublicUrl(filePath);

    return data.publicUrl;
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
