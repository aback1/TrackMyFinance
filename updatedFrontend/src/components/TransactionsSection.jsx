import React from "react";
import "../styles/TransactionsSections.css";
import TransactionItem from "./TransactionItem.jsx";

const transactionsData = [
    { id: 1, description: "Orlando Rodrigues", method: "Credit card",  date: "2024/04/01", amount: 750.0 },
    { id: 2, description: "Netflix",           method: "Credit card",  date: "2024/04/02", amount: -15.99 },
    { id: 3, description: "Spotify",           method: "Credit card",  date: "2024/04/03", amount: -9.99 },
    { id: 4, description: "Carl Andrew",       method: "Bank account", date: "2024/04/04", amount: 150.0 },
    { id: 5, description: "Carrefour Market",  method: "Bank account", date: "2024/04/05", amount: -120.0 },
];

export default function TransactionsSection() {
    return (
        <section className="transactions-section">
            <h3>Transactions</h3>
            <p className="transactions-subtitle">Check your last transactions</p>

            <div className="transactions-list">
                {transactionsData.map((tx) => (
                    <TransactionItem key={tx.id} tx={tx} />
                ))}
            </div>
        </section>
    );
}
