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
