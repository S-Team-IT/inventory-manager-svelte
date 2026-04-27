import AddProductForm from "features/add-product/add-product-form";
import { RoleContext } from "lib/context/context";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import Layout from "../layout";

export default function ProductQS() {
  const role = useContext(RoleContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!(role === "QS" || role === "Admin")) {
      navigate("/*");
    }
  }, [role, navigate]);

  return (
    <Layout spacing={5}>
      <AddProductForm />
    </Layout>
  );
}
