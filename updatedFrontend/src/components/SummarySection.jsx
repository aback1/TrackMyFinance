import React from "react";
import "../styles/SummarySection.css";
import SummaryCard from "./SummaryCard";

const summaryData = [
    {
        id: 1,
        title: "Balance",
        amount: "$5,502.45",
        comparison: "+12.5% from last month",
        comparisonType: "positive",
    },
    {
        id: 2,
        title: "Incomes",
        amount: "$9,450.00",
        comparison: "+2.7% from last month",
        comparisonType: "positive",
    },
    {
        id: 3,
        title: "Expenses",
        amount: "$3,945.55",
        comparison: "+15% from last month",
        comparisonType: "negative",
    },
];

export default function SummarySection() {
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
