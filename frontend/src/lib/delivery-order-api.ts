import { supabase } from "lib/supabase";

export async function insertDeliveryOrder(
    supplierID: string,
    deliveryID: string,
    deliveryDate: Date,
) {
    const { error } = await supabase.from("delivery_orders").insert({
        supplier_id: supplierID,
        id: deliveryID,
        date: deliveryDate,
    });
    if (error) {
        console.error("Error inserting delivery order: ", error);
        return false;
    }
    return true;
}
