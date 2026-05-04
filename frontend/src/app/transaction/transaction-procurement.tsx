import IncomingTransactionForm from "features/add-transaction/incoming-transaction-form";
import { RoleContext, SessionContext } from "lib/context/context";
import { useContext } from "react";
import Layout from "../layout";
import Missing from "../misc/missing";
import Loading from "../misc/loading";

export default function TransactionProcurement() {
  const session = useContext(SessionContext);
  const role = useContext(RoleContext);

  if (!session) return <Loading />
  if (!(role === "QS" || role === "Admin")) return <Missing />
  
  return (
    <Layout spacing={5}>
      <IncomingTransactionForm />
    </Layout>
  );
}
