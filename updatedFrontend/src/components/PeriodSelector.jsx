// src/components/PeriodSelector.jsx
import React from "react";
import "../styles/PeriodSelector.css";

export default function PeriodSelector() {
    return (
        <div className="period-selector">
            <h2>Hello, John!</h2>
            <div className="period-buttons">
                <button className="period-btn active">This month</button>
                <button className="period-btn">Last month</button>
                <button className="period-btn">Last 3 months</button>
                <button className="period-btn">Last 12 months</button>
            </div>
        </div>
    );
}
