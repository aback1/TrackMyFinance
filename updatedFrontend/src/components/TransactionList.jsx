import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetTransactionsQuery } from "../features/transaction/transactionApi.js";
import TransactionItem from "./TransactionItem.jsx";
import LoadingSpinner from "./LoadingSpinner.jsx";

export default function TransactionList() {
    const userName = "John Doe";
    const { data: transactions, error, isLoading } = useGetTransactionsQuery(userName);
    const [visibleCount, setVisibleCount] = useState(20);

    // Show more transactions when button is clicked
    const handleShowMore = () => {
        setVisibleCount((prevCount) => prevCount + 20);
    };

    if (isLoading) return <LoadingSpinner />;
    if (error) return <div>Error loading transactions.</div>;

    // Calculate total balance
    const totalBalance = transactions.reduce((sum, tx) => {
        return tx.type === "expense" ? sum - tx.amount : sum + tx.amount;
    }, 0).toFixed(2);

    return (
        <div className="transaction-list-container">
            {/* Balance Display */}
            <h2 className="balance">Balance: {totalBalance} €</h2>

            {/* Transaction Items */}
            <div className="transactions">
                {transactions.slice(0, visibleCount).map((transaction) => (
                    <TransactionItem key={transaction.id} transaction={transaction} />
                ))}
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
