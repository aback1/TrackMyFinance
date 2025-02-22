import React, { useState } from "react";
import { useGetTransactionsQuery } from "../features/transaction/transactionApi.js";
import TransactionItem from "./TransactionItem.jsx";
import LoadingSpinner from "./LoadingSpinner.jsx";
import {useSelector} from "react-redux";

export default function TransactionList() {
    const userName = useSelector((state) => state.login.userName) || "";
    const { data: transactions, error, isLoading } = useGetTransactionsQuery(userName);
    const [visibleCount, setVisibleCount] = useState(20);

    // Show more transactions when button is clicked
    const handleShowMore = () => {
        setVisibleCount((prevCount) => prevCount + 20);
    };

    if (isLoading) return <LoadingSpinner />;
    if (error) return <div>Error loading transactions.</div>;

    // Helper: parse "dd.mm.yyyy" date string into a Date object
    const parseDate = (dateStr) => {
        const [day, month, year] = dateStr.split(".");
        return new Date(Number(year), Number(month) - 1, Number(day));
    };

    // Sort transactions in descending order by date (most recent first)
    const sortedTransactions = [...transactions].sort(
        (a, b) => parseDate(b.date) - parseDate(a.date)
    );

    // Limit to visible transactions
    const visibleTransactions = sortedTransactions.slice(0, visibleCount);

    // Group transactions by month-year (format: "YYYY-MM")
    const groupedTransactions = visibleTransactions.reduce((groups, transaction) => {
        const dateObj = parseDate(transaction.date);
        const key = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1)
            .toString()
            .padStart(2, "0")}`;
        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(transaction);
        return groups;
    }, {});

    // Sort month keys in descending order (most recent month first)
    const monthKeys = Object.keys(groupedTransactions).sort((a, b) =>
        a > b ? -1 : a < b ? 1 : 0
    );

    // Calculate total balance
    const totalBalance = sortedTransactions
        .reduce((sum, tx) => (tx.type === "expense" ? sum - tx.amount : sum + tx.amount), 0)
        .toFixed(2);

    return (
        <div className="transaction-list-container">
            {/* Balance Display */}
            <h2 className="balance">Balance: {totalBalance} €</h2>

            {/* Transaction Items Grouped by Month */}
            <div className="transactions">
                {monthKeys.map((monthKey) => {
                    // Convert monthKey (YYYY-MM) to a human-readable format like "February 2025"
                    const [year, month] = monthKey.split("-");
                    const dateObj = new Date(year, month - 1);
                    const monthName = dateObj.toLocaleString("default", { month: "long" });
                    return (
                        <div key={monthKey}>
                            <h2>
                                {monthName} {year}
                            </h2>
                            {groupedTransactions[monthKey].map((transaction) => (
                                <TransactionItem key={transaction.id} transaction={transaction} />
                            ))}
                        </div>
                    );
                })}
            </div>

            {/* Show More Button */}
            {visibleCount < transactions.length && (
                <button onClick={handleShowMore} className="show-more-button">
                    Show More
                </button>
            )}
        </div>
    );
}
