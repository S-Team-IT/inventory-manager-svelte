import { supabase } from "lib/database/supabase";
import type { supplier } from "types/supabase";

export async function getAllSuppliers(): Promise<supplier[]> {
  const { error, data } = await supabase
    .from("suppliers")
    .select("*")
    .order("id", { ascending: true });
  if (error) {
    console.error("Error retrieving all suppliers: ", error);
    return [];
  }
  return data;
}

export async function insertNewSupplier(
  supplierName: string,
): Promise<supplier | null> {
  const { error, data } = await supabase
    .from("suppliers")
    .insert({ name: supplierName })
    .select()
    .returns<supplier>()
    .single();
  if (error) {
    console.error("Error insert new supplier: ", error);
    return null;
  }
  return data;
}
