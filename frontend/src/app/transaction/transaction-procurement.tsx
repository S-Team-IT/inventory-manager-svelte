import IncomingTransactionForm from "features/add-transaction/incoming-transaction-form";
import { RoleContext } from "lib/context/context";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import Layout from "../layout";

export default function TransactionProcurement() {
  const role = useContext(RoleContext);
  const navigate = useNavigate();

  useEffect(() => {
    if ((role && role !== "Procurement") || role !== "Admin") {
      navigate("/*");
    }
  }, [role, navigate]);

  return (
    <Layout spacing={5}>
      <IncomingTransactionForm />
    </Layout>
  );
}
