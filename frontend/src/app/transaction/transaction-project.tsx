import { OutgoingTransactionForm } from "features/add-transaction/outgoing-transaction-form";
import { RoleContext, SessionContext } from "lib/context/context";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import Layout from "../layout";

export default function TransactionProject() {
  const session = useContext(SessionContext);
  const role = useContext(RoleContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(session);
    if (!session || !(role === "Project" || role === "Admin")) {
      navigate("/*");
    }
  }, [session, role, navigate]);

  return (
    <Layout spacing={5}>
      <OutgoingTransactionForm />
    </Layout>
  );
}
