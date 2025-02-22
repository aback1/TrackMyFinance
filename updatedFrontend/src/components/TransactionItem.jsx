import React from "react";
import {useDeleteTransactionMutation} from "../features/transaction/transactionApi.js";
import SmallSpinner from "./SmallSpinner.jsx";
import {v4 as uuid} from "uuid";
import {addNotification} from "../features/notification/notificationSlice.js";
import {useDispatch, useSelector} from "react-redux";

export default function TransactionItem({ transaction }) {
    const { id, amount, paymentMethod, description, type, date } = transaction;

    const isExpense = type === "expense";
    const amountClass = isExpense ? "expense" : "income";
    const username = useSelector((state) => state.login.username) || "";
    const dispatch = useDispatch();

    const currency = useSelector((state) => state.transaction.currency);
    //Amount * 1.05 if the currency is USD * 1.0 else.
    const formattedAmount =
        currency === "USD"
            ? `${isExpense ? "-" : "+"}${(amount * 1.05).toFixed(2)}`
            : `${isExpense ? "-" : "+"}${amount.toFixed(2)}`;

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
                dispatch(addNotification({id: uuid, text: "Transaction deleted successfully"}))

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
