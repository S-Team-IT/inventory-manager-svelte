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

export async function insertNewTransaction(
    loggerID: string,
    productID: string,
    quantityChanged: number,
): Promise<boolean>;

export async function insertNewTransaction(
    loggerID: string,
    productID: string,
    quantityChanged: number,
    deliveryID: string,
    deliveryDate: Date,
): Promise<boolean>;

export async function insertNewTransaction(
    loggerID: string,
    productID: string,
    quantityChanged: number,
    deliveryID?: string,
    deliveryDate?: Date,
): Promise<boolean> {
    if (deliveryID && deliveryDate) {
        const { error } = await supabase.from("transactions").insert({
            logger_id: loggerID,
            product_id: productID,
            quantity_changed: quantityChanged,
        });
        if (error) {
            console.error("Error inserting transaction: ", error);
            return false;
        }
        return true;
    } else {
        const { error } = await supabase.from("transactions").insert({
            logger_id: loggerID,
            product_id: productID,
            quantity_changed: quantityChanged,
        });
        if (error) {
            console.error("Error inserting transaction: ", error);
            return false;
        }
        return true;
    }
}
