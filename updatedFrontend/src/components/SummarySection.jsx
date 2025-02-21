import React from "react";
import { useSelector } from "react-redux";
import "../styles/SummarySection.css";
import SummaryCard from "./SummaryCard";
import { useGetTransactionsQuery } from "../features/transaction/transactionApi";

// Helper: Parse "dd.mm.yyyy" format into Date object
const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split(".");
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
};

// Helper: Filter transactions for a specific month
const filterTransactionsForMonth = (transactions, year, month) => {
    return transactions.filter((tx) => {
        const txDate = parseDate(tx.date);
        return txDate.getFullYear() === year && txDate.getMonth() === month;
    });
};

// Utility to format numbers as currency
const formatCurrency = (num) => "$" + num.toFixed(2);

// Utility to calculate percentage difference
const calculatePercentageDifference = (current, previous) => {
    if (previous === 0) return "+100%"; // Avoid division by zero
    const difference = ((current - previous) / previous) * 100;
    return `${difference >= 0 ? "+" : ""}${difference.toFixed(1)}%`;
};

export default function SummarySection() {
    const userName = "John Doe";
    const { data: transactions, error, isLoading } = useGetTransactionsQuery(userName);
    const period = useSelector((state) => state.transaction.period);

    if (isLoading) {
        return <div>Loading summary...</div>;
    }

    if (error) {
        console.error(error);
        return <div>Error loading transactions.</div>;
    }

    // Current date
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    // Get transactions for this month and last month
    const currentMonthTransactions = filterTransactionsForMonth(transactions, currentYear, currentMonth);
    const lastMonthTransactions = filterTransactionsForMonth(transactions, lastMonthYear, lastMonth);

    // Compute incomes and expenses for both months
    const computeTotals = (transactions) => ({
        income: transactions
            .filter((tx) => tx.type.toLowerCase() === "income")
            .reduce((acc, tx) => acc + tx.amount, 0),
        expense: transactions
            .filter((tx) => ["expense", "transaction"].includes(tx.type.toLowerCase()))
            .reduce((acc, tx) => acc + tx.amount, 0),
    });

    const currentTotals = computeTotals(currentMonthTransactions);
    const lastTotals = computeTotals(lastMonthTransactions);

    // Compute balance using all transactions (not restricted by period)
    const totalIncome = transactions
        .filter((tx) => tx.type.toLowerCase() === "income")
        .reduce((acc, tx) => acc + tx.amount, 0);

    const totalExpense = transactions
        .filter((tx) => ["expense", "transaction"].includes(tx.type.toLowerCase()))
        .reduce((acc, tx) => acc + tx.amount, 0);

    const balance = totalIncome - totalExpense; // Current total balance
    const lastMonthBalance = lastTotals.income - lastTotals.expense; // Last month's balance

    // Compute balance comparison only if "This month" is selected
    const showComparison = period.toLowerCase() === "this month";
    const incomeComparison = showComparison ? calculatePercentageDifference(currentTotals.income, lastTotals.income) : "";
    const expenseComparison = showComparison ? calculatePercentageDifference(currentTotals.expense, lastTotals.expense) : "";
    const balanceComparison = showComparison ? calculatePercentageDifference(balance, lastMonthBalance) : "";

    // Build summary data
    const summaryData = [
        {
            id: 1,
            title: "Balance",
            amount: formatCurrency(balance),
            comparison: showComparison ? balanceComparison + " from last month" : "",
            comparisonType: balanceComparison.startsWith("-") ? "negative" : "positive",
        },
        {
            id: 2,
            title: "Income",
            amount: formatCurrency(currentTotals.income),
            comparison: showComparison ? incomeComparison + " from last month" : "",
            comparisonType: incomeComparison.startsWith("-") ? "negative" : "positive",
        },
        {
            id: 3,
            title: "Expenses",
            amount: formatCurrency(currentTotals.expense),
            comparison: showComparison ? expenseComparison + " from last month" : "",
            comparisonType: expenseComparison.startsWith("-") ? "positive" : "negative",
        },
    ];

    return (
        <section className="summary-section">
            <div className="summary-cards">
                {summaryData.map((item) => (
                    <SummaryCard key={item.id} item={item} />
                ))}
            </div>
        </section>
    );
}
