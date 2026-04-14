import { useState, useEffect } from "react";
import { supabase } from "lib/database/supabase";
import Navbar from "features/navbar/navbar";
import ProductTable from "features/product-table/product-table";
import ProductLog from "features/transaction-log/transaction-log";
import { Toolbar, Grid } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { SessionContext, RoleContext } from "lib/context/context";
import type { Session } from "@supabase/supabase-js";

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
                    <section>
                        <Navbar />
                        <Toolbar />
                    </section>
                    {/* Toolbar is here so the Navbar is sticky & doesn't cover the texts */}
                    <main>
                        <Grid container spacing={2}>
                            <Grid size={8}>
                                <ProductTable />
                            </Grid>
                            <Grid size={4}>
                                <ProductLog />
                            </Grid>
                        </Grid>
                    </main>
                </SessionContext>
            </RoleContext>
        </>
    );
}

export default App;
