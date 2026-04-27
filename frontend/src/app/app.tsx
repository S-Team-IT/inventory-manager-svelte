import CssBaseline from "@mui/material/CssBaseline";
import type { Session } from "@supabase/supabase-js";
import Navigation from "features/navigation/navigation";
import { RoleContext, SessionContext } from "lib/context/context";
import { supabase } from "lib/database/supabase";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Missing from "./misc/missing";
import ProductGeneral from "./product/product-general";
import ProductTest from "./product/product-procurement";
import ProductAdmin from "./product/product-qs";

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    async function fetchSession() {
      const { error, data } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session: ", error);
        //Theoretically shouldn't need to return null here
        //since data would automatically be null
      }
      setSession(data.session);
    }
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setRole("");
      },
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    async function fetchUserRole(id: string) {
      const { error, data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", id)
        .single()
        .returns<{ role: string }>();
      if (error) {
        console.error("Error fetching profiles: ", error);
        return;
      }
      setRole(data.role);
    }

    if (!session?.user.id) return;
    fetchUserRole(session.user.id);
  }, [session]);

  return (
    <>
      <CssBaseline />
      <RoleContext value={role}>
        <SessionContext value={session}>
          <BrowserRouter>
            <Routes>
              <Route element={<Navigation />}>
                <Route index element={<ProductGeneral />} />
                <Route path="add" element={<ProductAdmin />} />
                <Route path="addDO" element={<ProductTest />} />
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
