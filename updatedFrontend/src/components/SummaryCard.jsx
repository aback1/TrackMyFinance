import React from "react";
import "../styles/SummaryCard.css";

export default function SummaryCard({ item }) {
    const { title, amount, comparison, comparisonType } = item;

    return (
        <div className="card">
            <h3>{title}</h3>
            <p className="amount">{amount}</p>
            <p
                className={`comparison ${
                    comparisonType === "positive" ? "positive" : "negative"
                }`}
            >
                {comparison}
            </p>
        </div>
    );
}
