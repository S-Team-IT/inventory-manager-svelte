import IncomingTransactionForm from "features/add-transaction/incoming-transaction-form";
import Layout from "../layout";

export default function TransactionProcurement() {
  return (
    <Layout spacing={5}>
      <IncomingTransactionForm />
    </Layout>
  );
}
