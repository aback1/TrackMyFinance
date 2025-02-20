import React, { useState } from "react";
import "../styles/TransactionForm.css";

export default function TransactionForm({ type, onClose }) {
    const [amount, setAmount] = useState("");
    const [method, setMethod] = useState("credit card");
    const [date, setDate] = useState("");

    // For description (income/expense) or username (transfer)
    const [description, setDescription] = useState("");
    const [username, setUsername] = useState("");

    // Helper: auto-format "13022024" -> "13.02.2024"
    const formatDateInput = (value) => {
        const digits = value.replace(/\D/g, "");

        let day = digits.substring(0, 2);
        let month = digits.substring(2, 4);
        let year = digits.substring(4, 8);

        let formatted = "";
        if (day) {
            formatted += day;
        }
        if (month) {
            formatted += "." + month;
        }
        if (year) {
            formatted += "." + year;
        }
        return formatted;
    };

    const handleDateChange = (e) => {
        setDate(formatDateInput(e.target.value));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // If it's a "transfer," we store it as an expense internally
        const actualType = type === "transfer" ? "expense" : type;

        // Example payload
        if (type === "transfer") {
            console.log({
                transactionType: actualType,
                usernameToSendMoney: username,
                amount,
                paymentMethod: method,
                date,
            });
        } else {
            console.log({
                transactionType: actualType,
                description,
                amount,
                paymentMethod: method,
                date,
            });
        }

        onClose();
    };

    // Friendly title based on the type prop
    let title;
    if (type === "income") {
        title = "Add Income";
    } else if (type === "expense") {
        title = "Add Expense";
    } else if (type === "transfer") {
        title = "Transfer Money";
    }

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h2 className="modal-title">{title}</h2>
                <form onSubmit={handleSubmit} className="transaction-form">
                    {/* Conditionally render Description or Username */}
                    {type === "transfer" ? (
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter username to send money"
                            />
                        </div>
                    ) : (
                        <div className="form-group">
                            <label>Description</label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter description"
                            />
                        </div>
                    )}

                    {/* Amount */}
                    <div className="form-group">
                        <label>Amount</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                        />
                    </div>

                    {/* Payment Method */}
                    <div className="form-group">
                        <label>Payment Method</label>
                        <select value={method} onChange={(e) => setMethod(e.target.value)}>
                            <option value="credit card">Credit Card</option>
                            <option value="bank account">Bank Account</option>
                            <option value="paypal">Paypal</option>
                            <option value="cash">Cash</option>
                        </select>
                    </div>

                    {/* Date */}
                    <div className="form-group">
                        <label>Date</label>
                        <input
                            type="text"
                            value={date}
                            onChange={handleDateChange}
                            placeholder="dd.mm.yyyy"
                            maxLength={10}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="button-row">
                        <button
                            type="button"
                            onClick={onClose}
                            className="cancel-btn"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="submit-btn"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
