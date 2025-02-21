import React from "react";
import { useSelector } from "react-redux";
import { useGetTransactionsQuery } from "../features/transaction/transactionApi";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import "../styles/ExpenseChartSection.css";

// 50-color array
const COLORS = [
    "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A569BD", "#E74C3C", "#1ABC9C",
    "#D35400", "#2ECC71", "#5D6D7E", "#F4D03F", "#DFFF00", "#40E0D0", "#6495ED",
    "#DC143C", "#7FFF00", "#FF69B4", "#8A2BE2", "#5F9EA0", "#CD5C5C", "#FF6347",
    "#4682B4", "#2E8B57", "#FF4500", "#DA70D6", "#32CD32", "#BA55D3", "#FFD700",
    "#7B68EE", "#00FA9A", "#FFA07A", "#20B2AA", "#778899", "#FF00FF", "#B22222",
    "#A52A2A", "#000080", "#ADFF2F", "#B0C4DE", "#8B008B", "#7CFC00", "#BDB76B",
    "#00CED1", "#8FBC8F", "#FF1493", "#E9967A", "#9932CC", "#FA8072", "#87CEEB",
    "#F0E68C"
];

// Helper to parse a "dd.mm.yyyy" date string into a Date object.
const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split(".");
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
};

// Helper to filter transactions based on the selected period.
// You can adjust this logic as needed.
const filterTransactionsByPeriod = (transactions, period) => {
    if (!transactions) return [];
    const now = new Date();
    let startDate;
    const periodLower = period.toLowerCase();

    if (periodLower === "this month") {
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    } else if (periodLower === "last month") {
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const endDate = new Date(now.getFullYear(), now.getMonth(), 0);
        return transactions.filter((tx) => {
            const txDate = parseDate(tx.date);
            return txDate >= startDate && txDate <= endDate;
        });
    } else if (periodLower === "last 3 months") {
        startDate = new Date(now.getFullYear(), now.getMonth() - 2, 1);
    } else if (periodLower === "last 12 months") {
        startDate = new Date(now.getFullYear() - 1, now.getMonth(), 1);
    } else {
        return transactions;
    }

    return transactions.filter((tx) => parseDate(tx.date) >= startDate);
};

export default function ExpenseChartSection() {
    const userName = "John Doe";
    const { data: transactions, error, isLoading } = useGetTransactionsQuery(userName);
    const period = useSelector(state => state.transaction.period);

    if (isLoading) {
        return <div>Loading expense chart...</div>;
    }
    if (error) {
        console.error(error);
        return <div>Error loading expense data.</div>;
    }

    // Filter for transactions that are expenses or transfers.
    const expenseTransactions = transactions.filter(tx => {
        const typeLower = tx.type.toLowerCase();
        return typeLower === "expense" || typeLower === "transaction";
    });

    // Filter expenses based on the selected period.
    const filteredExpenses = filterTransactionsByPeriod(expenseTransactions, period);

    // Group by description (using the transaction's description)
    const grouped = filteredExpenses.reduce((acc, tx) => {
        const desc = tx.description;
        // Sum the absolute amount (so negative values are treated as positive)
        const amt = Math.abs(tx.amount);
        acc[desc] = (acc[desc] || 0) + amt;
        return acc;
    }, {});

    // Calculate total expenses in the period.
    const totalExpense = Object.values(grouped).reduce((acc, val) => acc + val, 0);

    // Create chart data: each entry's value is the percentage of total expense.
    const chartData = Object.entries(grouped).map(([description, amt]) => {
        const percentage = totalExpense ? (amt / totalExpense) * 100 : 0;
        return { name: description, value: parseFloat(percentage.toFixed(1)) };
    });

    return (
        <section className="expense-chart-section">
            <h3>Expenses by category</h3>
            <div className="chart-container">
                <PieChart width={220} height={220}>
                    <Pie
                        data={chartData}
                        cx={110}
                        cy={110}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                </PieChart>
            </div>

            <div className="chart-legend">
                {chartData.map((entry, index) => (
                    <div key={index} className="legend-item">
            <span
                className="legend-color"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></span>
                        <span className="legend-text">
              {entry.name} - {entry.value}%
            </span>
                    </div>
                ))}
            </div>
        </section>
    );
}
