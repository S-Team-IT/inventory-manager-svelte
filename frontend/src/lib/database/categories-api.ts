import type { category } from "types/supabase";
import { supabase } from "./supabase";

export async function getAllProductCategories(): Promise<category[]> {
  const { error, data } = await supabase.from("product_categories").select("*");
  if (error) {
    console.error("Error retrieving categories: ", error);
    return [];
  }
  return data;
}

export async function insertNewCategory(
  categoryName: string,
): Promise<category | null> {
  const { error, data } = await supabase
    .from("product_categories")
    .insert({ name: categoryName })
    .select()
    .returns<category>()
    .single();
  if (error) {
    console.error("Error inserting new category: ", error);
    return null;
  }
  return data;
}
