import "bulma/css/bulma.min.css";
import Navbar from "features/navbar/navbar";
import ProductTable from "features/product-table/product-table";
import ProductLog from "features/transaction-log/transaction-log";
import { Toolbar } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
    return (
        <>
            <CssBaseline>
                <Navbar />
                <Toolbar />
                {/* Toolbar is here so the Navbar is sticky & doesn't cover the texts */}
            </CssBaseline>
            <main className="columns m-5">
                <ProductTable />
                <ProductLog />
            </main>
        </>
    );
}

export default App;
