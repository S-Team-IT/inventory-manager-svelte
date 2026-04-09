import { supabase } from "lib/supabase";
import type { transaction } from "types/supabase";

export async function getAllTransactions(): Promise<transaction[]> {
    const { error, data } = await supabase
        .from("transactions")
        .select(
            `id, 
            creationTimestamp:created_at, 
            logger:users(firstName:first_name),
            product:products(name),
            quantityChanged:quantity_changed`,
        )
        .order("created_at", { ascending: false })
        .returns<transaction[]>();
    if (error) {
        console.error("Error retrieving products: ", error);
        return [];
    }
    return data;
}
