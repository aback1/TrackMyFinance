import React, { useState } from "react";
import "../styles/TransactionForm.css";
import { useAddTransactionMutation } from "../features/transaction/transactionApi.js";
import SmallSpinner from "./SmallSpinner.jsx";
import {useDispatch, useSelector} from "react-redux";
import {addNotification} from "../features/notification/notificationSlice.js";
import {v4 as uuid} from "uuid";


export default function TransactionForm({ type, onClose }) {
    const [amount, setAmount] = useState("");
    const userName = useSelector((state) => state.login.userName) || "";
    const [method, setMethod] = useState("credit card");
    const [date, setDate] = useState("");
    const [addPayment, { error, isLoading }] = useAddTransactionMutation(userName);
    const [description, setDescription] = useState("");
    const [username, setUsername] = useState("");
    const dispatch = useDispatch();

    const formatDateInput = (value) => {
        const digits = value.replace(/\D/g, "");
        let day = digits.substring(0, 2);
        let month = digits.substring(2, 4);
        let year = digits.substring(4, 8);
        return `${day}${month ? "." + month : ""}${year ? "." + year : ""}`;
    };

    const handleDateChange = (e) => setDate(formatDateInput(e.target.value));

    let title = type === "income" ? "Add Income" : type === "expense" ? "Add Expense" : "Transfer Money";

    const handleAddTransaction = async (e) => {
        e.preventDefault();
        try {
            const newTransferFrom = { description: `To ${username}`, username: userName, amount, date, type: "expense", paymentMethod: method };
            const response = await addPayment(newTransferFrom).unwrap();
            if (response.status === "transaction added successfully") {
                const newTransferTo = { description: `From ${userName}`, username, amount, date, type: "income", paymentMethod: method };
                const responseTo = await addPayment(newTransferTo).unwrap();
                if (responseTo.status === "transaction added successfully") {
                    alert(`Transfer to ${username} was successful`);
                    dispatch(addNotification({
                        id: uuid(), text: "Transfer successful"
                    }));
                    onClose();
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddPayment = async (e) => {
        e.preventDefault();
        try {
            const newTransaction = { description, username: userName, amount, date, type, paymentMethod: method };
            const response = await addPayment(newTransaction).unwrap();
            if (response.status === "transaction added successfully") {
                alert("Payment Added");
                dispatch(addNotification({id: uuid(), text: "Payment Added"}));
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (type === "transfer") {
            handleAddTransaction(e);
        } else {
            handleAddPayment(e);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h2 className="modal-title">{title}</h2>
                <form onSubmit={handleSubmit} className="transaction-form">
                    {type === "transfer" ? (
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username to send money" />
                        </div>
                    ) : (
                        <div className="form-group">
                            <label>Description</label>
                            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description" />
                        </div>
                    )}
                    <div className="form-group">
                        <label>Amount</label>
                        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" />
                    </div>
                    <div className="form-group">
                        <label>Payment Method</label>
                        <select value={method} onChange={(e) => setMethod(e.target.value)}>
                            <option value="credit card">Credit Card</option>
                            <option value="bank account">Bank Account</option>
                            <option value="paypal">Paypal</option>
                            <option value="cash">Cash</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Date</label>
                        <input type="text" value={date} onChange={handleDateChange} placeholder="dd.mm.yyyy" maxLength={10} />
                    </div>
                    <div className="button-row">
                        <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
                        {!isLoading ? (
                            <button type="submit" className="submit-btn">Submit</button>
                        ) : (
                            <SmallSpinner />
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}