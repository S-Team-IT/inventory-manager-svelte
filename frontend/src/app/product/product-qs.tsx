import AddProductForm from "features/add-product/add-product-form";
import { RoleContext, SessionContext } from "lib/context/context";
import { useContext } from "react";
import Layout from "../layout";
import Loading from "../misc/loading";
import Missing from "../misc/missing";

export default function ProductQS() {
  const session = useContext(SessionContext);
  const role = useContext(RoleContext);

  if (!session) return <Loading />
  if (!(role === "QS" || role === "Admin")) return <Missing />

  return (
    <Layout spacing={5}>
      <AddProductForm />
    </Layout>
  );
}
