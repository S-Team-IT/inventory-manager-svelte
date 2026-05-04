import AddAccountForm from "features/add-account/add-account-form";
import { RoleContext, SessionContext } from "lib/context/context";
import { useContext } from "react";
import Layout from "../layout";
import Loading from "../misc/loading";
import Missing from "../misc/missing";

export default function TransactionProcurement() {
  const session = useContext(SessionContext);
  const role = useContext(RoleContext);

  if (!session) return <Loading />
  if (!(role === "Admin")) return <Missing />
  
  return (
    <Layout spacing={5}>
      <AddAccountForm />
    </Layout>
  );
}
