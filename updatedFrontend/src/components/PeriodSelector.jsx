// src/components/PeriodSelector.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPeriod } from "../features/transaction/transactionSlice";
import "../styles/PeriodSelector.css";

export default function PeriodSelector() {
    const dispatch = useDispatch();
    const selectedPeriod = useSelector(state => state.transaction.period);

    const periods = ["This month", "Last month", "Last 3 months", "Last 12 months"];

    return (
        <div className="period-selector">
            <h2>Hello, John!</h2>
            <div className="period-buttons">
                {periods.map((period) => (
                    <button
                        key={period}
                        className={`period-btn ${selectedPeriod === period ? "active" : ""}`}
                        onClick={() => dispatch(setPeriod(period))}
                    >
                        {period}
                    </button>
                ))}
            </div>
        </div>
    );
}
