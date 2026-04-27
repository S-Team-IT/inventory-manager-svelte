import { OutgoingTransactionForm } from "features/add-transaction/outgoing-transaction-form";
import Layout from "../layout";

export default function TransactionProject() {
  return (
    <Layout spacing={5}>
      <OutgoingTransactionForm />
    </Layout>
  );
}
