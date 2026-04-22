import { supabase } from "./supabase";

export async function uploadImage(file: File): Promise<string | null> {
  const filePath = `${file.name}-${Date.now()}`;
  const { error } = await supabase.storage
    .from("product-images")
    .upload(filePath, file);
  if (error) {
    console.error("Error uploading image: ", error);
    return null;
  }

  const { data } = supabase.storage
    .from("product-images")
    .getPublicUrl(filePath);

  return data.publicUrl;
}
