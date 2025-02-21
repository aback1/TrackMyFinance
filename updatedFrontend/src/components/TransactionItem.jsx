import React from "react";
import {useDeleteTransactionMutation} from "../features/transaction/transactionApi.js";
import SmallSpinner from "./SmallSpinner.jsx";

export default function TransactionItem({ transaction }) {
    const { id, amount, paymentMethod, description, type, date } = transaction;

    const isExpense = type === "expense";
    const amountClass = isExpense ? "expense" : "income";
    const formattedAmount = `${isExpense ? "-" : "+"}${amount.toFixed(2)}`;
    const username = "John Doe";

    const [deleteTransaction, {error, isLoading}] = useDeleteTransactionMutation();

    const handleDeleteTransaction = async() => {
        const newDeleteInformation = {
          username,
          id,
        };
        let response;
        try {
            response = await(deleteTransaction(newDeleteInformation).unwrap());
            console.log(response);
            if (response.status === "transaction deleted successfully"){
                alert(`Transaction deleted successfully`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="transaction-item">
            <div className="transaction-top">
                <span className="transaction-description">{description}</span>
                {/*⋮*/}
                {!isLoading ? (
                    <button onClick={handleDeleteTransaction} className="options-button">x</button>
                ) : (
                    <SmallSpinner />
                    )
                }
            </div>
            <div className="transaction-middle">
                <span className="tx-method">{paymentMethod}</span>
                <span className="tx-date">{date}</span>
            </div>
            <div className={`transaction-amount ${amountClass}`}>
                {formattedAmount}
            </div>
        </div>
    );
}
