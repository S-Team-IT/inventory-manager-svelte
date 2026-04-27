import { OutgoingTransactionForm } from "features/add-transaction/outgoing-transaction-form";
import { RoleContext } from "lib/context/context";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import Layout from "../layout";

export default function TransactionProject() {
  const role = useContext(RoleContext);
  const navigate = useNavigate();

  useEffect(() => {
    if ((role && role !== "Project") || role !== "Admin") {
      navigate("/*");
    }
  }, [role, navigate]);

  return (
    <Layout spacing={5}>
      <OutgoingTransactionForm />
    </Layout>
  );
}
