import { supabase } from "lib/database/supabase";
import type { deliveryOrder } from "types/supabase";

export async function insertNewDeliveryOrder(
  supplierID: string,
  orderID: string,
  orderDate: Date,
): Promise<string> {
  const { error, data } = await supabase
    .from("delivery_orders")
    .insert({
      supplier_id: supplierID,
      order_id: orderID,
      order_date: orderDate,
    })
    .select("deliveryOrderID:id")
    .single();
  if (error) {
    console.error("Error inserting delivery order: ", error);
    return "";
  }
  return (
    data as {
      deliveryOrderID: string;
    }
  ).deliveryOrderID;
}

export async function getDeliveryOrderByID(
  id: string,
): Promise<deliveryOrder[]> {
  const { error, data } = await supabase
    .from("delivery_orders")
    .select("orderID:order_id, orderDate:order_date, supplier:suppliers(name)")
    .eq("id", id)
    .returns<deliveryOrder[]>();
  if (error) {
    console.error("Error retrieving delivery order by ID: ", error);
    return [];
  }

  return data;
}

export async function getDeliveryOrderIDByOrderIDAndDate(
  orderID: string,
  orderDate: Date,
) {
  const { error, data } = await supabase
    .from("delivery_orders")
    .select("id")
    .eq("order_id", orderID)
    .eq("order_date", orderDate.toISOString());
  if (error) {
    //PGRST116 is the error code for not
    if (error.code === "PGRST116") {
      //supabase cannot do .single()
      // because then an error is thrown(not affected by the above error handling)
      // when data is empty
      return null;
    }
    console.error("Error retrieving delivery order by orderID & Date: ", error);
  }

  if (!data || data.length === 0) {
    return null;
  }

  return data[0].id;
}
