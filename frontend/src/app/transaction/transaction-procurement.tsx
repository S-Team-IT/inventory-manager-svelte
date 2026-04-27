import IncomingTransactionForm from "features/add-transaction/incoming-transaction-form";
import { RoleContext, SessionContext } from "lib/context/context";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import Layout from "../layout";

export default function TransactionProcurement() {
  const session = useContext(SessionContext);
  const role = useContext(RoleContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!session || !(role === "Procurement" || role === "Admin")) {
      navigate("/*");
    }
  }, [session, role, navigate]);

  return (
    <Layout spacing={5}>
      <IncomingTransactionForm />
    </Layout>
  );
}
