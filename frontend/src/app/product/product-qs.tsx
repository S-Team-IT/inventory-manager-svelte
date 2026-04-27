import AddProductForm from "features/add-product/add-product-form";
import { RoleContext, SessionContext } from "lib/context/context";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import Layout from "../layout";

export default function ProductQS() {
  const session = useContext(SessionContext);
  const role = useContext(RoleContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!session || !(role === "QS" || role === "Admin")) {
      navigate("/*");
    }
  }, [session, role, navigate]);

  return (
    <Layout spacing={5}>
      <AddProductForm />
    </Layout>
  );
}
