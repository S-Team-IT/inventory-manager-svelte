import type { transaction } from "types/supabase";

export function filterTransactionsByProductID(
  productID: string,
  transactionArray: transaction[],
): transaction[] {
  return transactionArray.filter(
    (transaction) => transaction.product.masterID == productID,
  );
}
