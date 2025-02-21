import React from "react";
import "../styles/ActionsBar.css"; // your CSS for styling
import { FaPlus, FaMinus, FaExchangeAlt } from "react-icons/fa";

export default function ActionsBar({ onAddIncome, onAddExpense, onTransfer }) {
    return (
        <div className="actions-cards">
            <div className="action-card" onClick={onAddIncome}>
                <div className="action-icon">
                    <FaPlus />
                </div>
                <h4>Add income</h4>
                <p>Create an income manually</p>
            </div>

            <div className="action-card" onClick={onAddExpense}>
                <div className="action-icon">
                    <FaMinus />
                </div>
                <h4>Add expense</h4>
                <p>Create an expense manually</p>
            </div>

            <div className="action-card" onClick={onTransfer}>
                <div className="action-icon">
                    <FaExchangeAlt />
                </div>
                <h4>Transfer money</h4>
                <p>Select an account and make a transfer</p>
            </div>
        </div>
    );
}
