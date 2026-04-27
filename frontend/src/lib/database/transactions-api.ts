import type { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "lib/database/supabase";
import type { transaction, transactionInsert } from "types/supabase";

export async function getAllTransactions(): Promise<transaction[]> {
  const { error, data } = await supabase
    .from("transactions")
    .select(
      `id, 
      creationTimestamp:created_at, 
      logger:profiles(firstName:first_name),
      product:products(masterID:master_id,name),
      quantityChanged:quantity_changed,
      deliveryID:delivery_id`,
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
): Promise<boolean>;

export async function insertNewTransaction(
  loggerID: string,
  productID: string,
  quantityChanged: number,
  deliveryID?: string,
): Promise<boolean> {
  let error: PostgrestError | null;
  if (deliveryID) {
    ({ error } = await supabase.from("transactions").insert({
      logger_id: loggerID,
      product_id: productID,
      quantity_changed: quantityChanged,
      delivery_id: deliveryID,
    }));
  } else {
    ({ error } = await supabase.from("transactions").insert({
      logger_id: loggerID,
      product_id: productID,
      quantity_changed: quantityChanged,
    }));
  }

  if (error) {
    console.error("Error inserting transaction: ", error);
    return false;
  }
  return true;
}

export async function insertBulkTransactions(transactions: transactionInsert[]):Promise<boolean> {
  console.log(transactions);

  const {error} = await supabase.from("transactions").insert(transactions);
  if (error) {
    console.error("Error inserting bulk transactions: ", error);
    return false;
  }
  return true;
}
