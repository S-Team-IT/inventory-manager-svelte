import { supabase } from "lib/database/supabase";
import type { product } from "types/supabase";

export async function getAllProducts(): Promise<product[]> {
    const { error, data } = await supabase
        .from("products")
        .select(
            `masterID:master_id, 
            name, 
            photoPaths:photo_paths, 
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
