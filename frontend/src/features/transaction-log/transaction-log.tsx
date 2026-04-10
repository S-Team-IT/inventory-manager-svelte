import { useState, useEffect } from "react";
import LogCard from "./components/transaction-message";
import type { transaction } from "types/supabase";
import { getAllTransactions } from "lib/database/transactions-api";

function TransactionLog() {
    const [transactions, setTransactions] = useState<transaction[]>([]);

    useEffect(() => {
        async function fetchTransactions() {
            const transactions = await getAllTransactions();
            setTransactions(transactions);
        }
        fetchTransactions();
    }, []);

    return (
        <section className="column">
            {transactions.map((transaction) => (
                <LogCard transaction={transaction} key={transaction.id} />
            ))}
        </section>
    );
}

export default TransactionLog;
