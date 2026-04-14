import { useState, useEffect } from "react";
import { supabase } from "lib/database/supabase";
import "bulma/css/bulma.min.css";
import Navbar from "features/navbar/navbar";
import ProductTable from "features/product-table/product-table";
import ProductLog from "features/transaction-log/transaction-log";
import { Toolbar } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { SessionContext } from "lib/context/context";
import type { Session } from "@supabase/supabase-js";

function App() {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        async function fetchSession() {
            const { error, data } = await supabase.auth.getSession();
            if (error) {
                console.error("Error fetching session: ", error);
                //Theoretically shouldn't need to return null here
                //since data would automatically be null
            }
            console.log("Fetched session: ", data.session);
            setSession(session);
        }
        fetchSession();

        const { data: authListener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
            },
        );
        return () => {
            authListener.subscription.unsubscribe();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <SessionContext value={session}>
                <CssBaseline>
                    <Navbar />

                    <Toolbar />
                    {/* Toolbar is here so the Navbar is sticky & doesn't cover the texts */}
                </CssBaseline>
                <main className="columns m-5">
                    <ProductTable />
                    <ProductLog />
                </main>
            </SessionContext>
        </>
    );
}

export default App;
