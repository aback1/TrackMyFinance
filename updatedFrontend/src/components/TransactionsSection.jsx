import React from "react";
import { useSelector } from "react-redux";
import "../styles/TransactionsSections.css";
import TransactionItem from "./TransactionItem.jsx";
import { useGetTransactionsQuery } from "../features/transaction/transactionApi.js";
import LoadingSpinner from "./LoadingSpinner.jsx";

// Helper functions defined above
const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('.');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
};

const filterTransactionsByPeriod = (transactions, period) => {
    const now = new Date();
    let startDate, endDate;
    const periodLower = period.toLowerCase();

    if (periodLower === "this month") {
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        return transactions.filter(tx => {
            const txDate = parseDate(tx.date);
            return txDate >= startDate && txDate <= endDate;
        });
    } else if (periodLower === "last month") {
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        endDate = new Date(now.getFullYear(), now.getMonth(), 0);
        return transactions.filter(tx => {
            const txDate = parseDate(tx.date);
            return txDate >= startDate && txDate <= endDate;
        });
    } else if (periodLower === "last 3 months") {
        startDate = new Date(now.getFullYear(), now.getMonth() - 2, 1);
        return transactions.filter(tx => {
            const txDate = parseDate(tx.date);
            return txDate >= startDate && txDate <= now;
        });
    } else if (periodLower === "last 12 months") {
        startDate = new Date(now.getFullYear() - 1, now.getMonth(), 1);
        return transactions.filter(tx => {
            const txDate = parseDate(tx.date);
            return txDate >= startDate && txDate <= now;
        });
    } else {
        return transactions;
    }
};

export default function TransactionsSection() {
    const userName = "John Doe";
    const { data: TransactionData, error, isLoading } = useGetTransactionsQuery(userName);
    const period = useSelector(state => state.transaction.period);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        console.error(error);
        return <div>Error loading transactions.</div>;
    }

    // Filter the transactions based on the selected period
    const filteredTransactions = TransactionData ? filterTransactionsByPeriod(TransactionData, period) : [];

    return (
        <section className="transactions-section">
            <h3>Transactions</h3>
            <p className="transactions-subtitle">Check your last transactions</p>

            <div className="transactions-list">
                {filteredTransactions.map((transaction) => (
                    <TransactionItem key={transaction.id} transaction={transaction} />
                ))}
            </div>
        </section>
    );
}
