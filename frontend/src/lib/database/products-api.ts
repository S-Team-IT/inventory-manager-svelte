import { supabase } from "lib/database/supabase";
import type { product, productInsert } from "types/supabase";

export async function getAllProducts(): Promise<product[]> {
  const { error, data } = await supabase
    .from("products")
    .select(
      `masterID:master_id, 
            name, 
            photoUrls:photo_paths, 
            quantity:current_quantity, 
            category:product_categories(name), 
            isDisabled:disabled`,
    )
    .order("disabled")
    .order("master_id", { ascending: true })
    .returns<product[]>();
  if (error) {
    console.error("Error retrieving products: ", error);
    return [];
  }
  return data;
}

export async function updateProductQuantity(
  masterID: string,
  newQuantity: number,
) {
  const { error } = await supabase
    .from("products")
    .update({ current_quantity: newQuantity })
    .eq("master_id", masterID);
  if (error) {
    console.error("Error updating product quantity", error);
    return;
  }
}

export async function insertNewProduct(
  newProduct: productInsert,
): Promise<boolean> {
  const { error } = await supabase.from("products").insert(newProduct);
  if (error) {
    console.error("Error inserting new product: ", error);
    return false;
  }
  return true;
}

export async function getProductByMaster(master: string): Promise<string> {
  const { error, data } = await supabase
    .from("products")
    .select("name")
    .eq("master_id", master)
    .single()
    .returns<{ name: string }>();
  if (error) {
    console.error("Error getting product by master", error);
    return "";
  }
  return data.name;
}

export async function getQuantityByMaster(
  master: string,
): Promise<number | null> {
  const { error, data } = await supabase
    .from("products")
    .select("currentQuantity:current_quantity")
    .eq("master_id", master)
    .single()
    .returns<{ currentQuantity: number }>();
  if (error) {
    console.error("Error getting product by master", error);
    return null;
  }
  return data.currentQuantity;
}

export async function deleteItem(master: string): Promise<boolean> {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("master_id", master);
  if (error) {
    console.error("Error deleting item: ", error);
    return false;
  }
  return true;
}
