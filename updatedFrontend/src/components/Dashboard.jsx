import React, { useState } from "react";
import "../styles/Dashboard.css";
import ActionsBar from "./ActionsBar";
import TransactionForm from "./TransactionForm";
import PeriodSelector from "./PeriodSelector.jsx";
import SummarySection from "./SummarySection.jsx";
import ExpenseChartSection from "./ExpenseChartSection.jsx";
import TransactionsSection from "./TransactionsSection.jsx";

export default function Dashboard() {
    const [showForm, setShowForm] = useState(false);
    const [transactionType, setTransactionType] = useState(null);

    // Handlers to open the form for each type
    const handleAddIncome = () => {
        setTransactionType("income");
        setShowForm(true);
    };

    const handleAddExpense = () => {
        setTransactionType("expense");
        setShowForm(true);
    };

    const handleTransfer = () => {
        setTransactionType("transfer");
        setShowForm(true);
    };

    // Close the form
    const handleCloseForm = () => {
        setShowForm(false);
        setTransactionType(null);
    };

    return (
        <div className="dashboard">
            <PeriodSelector />
            <div className="top-section">
                {/* Pass our callbacks into the ActionsBar */}
                <SummarySection />
                <ActionsBar
                    onAddIncome={handleAddIncome}
                    onAddExpense={handleAddExpense}
                    onTransfer={handleTransfer}
                />
            </div>

            <div className="bottom-section">
                <ExpenseChartSection />
                <TransactionsSection />
            </div>

            {/* Conditionally render the modal form */}
            {showForm && (
                <TransactionForm
                    type={transactionType}
                    onClose={handleCloseForm}
                />
            )}
        </div>
    );
}
