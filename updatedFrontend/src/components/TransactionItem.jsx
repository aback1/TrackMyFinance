import React from "react";

export default function TransactionItem({ tx }) {

    const isIncome = tx.amount > 0;
    const amountClass = isIncome ? "income" : "expense";

    return (
        <div className="transaction-item">
            <div className="transaction-top">
                <span className="tx-description">{tx.description}</span>
                <button className="options-button">⋮</button>
            </div>
            <div className="transaction-middle">
                <span className="tx-method">{tx.method}</span>
                <span className="tx-date">{tx.date}</span>
            </div>
            <div className={`tx-amount ${amountClass}`}>
                {isIncome ? `+${tx.amount.toFixed(2)}` : tx.amount.toFixed(2)}
            </div>
        </div>
    );
}
