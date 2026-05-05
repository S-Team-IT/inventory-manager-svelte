import CssBaseline from "@mui/material/CssBaseline";
import type { Session } from "@supabase/supabase-js";
import UpdatePasswordForm from "features/update-password/update-password-form";
import { RoleContext, SessionContext } from "lib/context/context";
import { supabase } from "lib/database/supabase";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import AccountAdmin from "./account/account-admin";
import Missing from "./misc/missing";
import Navigation from "./navigation/navigation";
import ProductGeneral from "./product/product-general";
import ProductQS from "./product/product-qs";
import TransactionProcurement from "./transaction/transaction-procurement";
import TransactionProject from "./transaction/transaction-project";

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    async function fetchSession() {
      const { error, data } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session: ", error);
      }
      setSession(data.session);
    }
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setRole("");
        setIsVerified(false);
      },
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    async function fetchUser(id: string): Promise<void> {
      const { error, data } = await supabase
        .from("profiles")
        .select("role, isVerified:is_verified")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching profiles: ", error);
        return;
      }
      setRole(data.role);
      setIsVerified(data.isVerified);
    }
    if (!session?.user.id) return;
    fetchUser(session.user.id);
  }, [session]);

  const VerifiedLayout = () => {
    if (session && !isVerified) {
      return <UpdatePasswordForm />;
    }
    return <Navigation />;
  };

  return (
    <>
      <CssBaseline />
      <RoleContext value={role}>
        <SessionContext value={session}>
          <BrowserRouter>
            <Routes>
              <Route element={<VerifiedLayout />}>
                <Route index element={<ProductGeneral />} />
                <Route path="add-product" element={<ProductQS />} />
                <Route
                  path="incoming-transaction"
                  element={<TransactionProcurement />}
                />
                <Route
                  path="outgoing-transaction"
                  element={<TransactionProject />}
                />
                <Route path="add-account" element={<AccountAdmin />} />
              </Route>
              <Route path="/*" element={<Missing />} />
            </Routes>
          </BrowserRouter>
        </SessionContext>
      </RoleContext>
    </>
  );
}

export default App;
