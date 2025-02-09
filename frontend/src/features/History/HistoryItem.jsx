import React from 'react';
import Button from '../../components/Button.jsx';
import { createDispatchHook, useDispatch, useSelector } from 'react-redux';
import { useDeleteSavingsMutation } from './historyApi.js';
import { addComparison } from '../Comparison/comparisonSlice.js';

export default function HistoryItem({ spending }) {
  const {
    month,
    income,
    rentcosts,
    sidecosts,
    foodanddrinkscosts,
    hobbycosts,
    savingscosts,
    mobilitycosts,
    insurancecosts,
  } = spending;

  const [deleteSpending] = useDeleteSavingsMutation();
  const userName = useSelector((state) => state.login.userName);
  const dispatch = useDispatch();

  const handleDeleteHistoryItem = async (month, userName) => {
    try {
      const newToDeleteSpending = {
        username: userName,
        month: month,
      };
      const response = await deleteSpending(newToDeleteSpending).unwrap();
      if (response.ok) {
        console.log('Eintrag wurde gelöscht');
      }
    } catch (error) {
      alert(error?.data.error[0]);
    }
  };

  const handleRestoreHistoryItem = () => {
    const newComparison = {
      month,
      income,
      rentcosts,
      sidecosts,
      foodanddrinkscosts,
      hobbycosts,
      savingscosts,
      mobilitycosts,
      insurancecosts,
    };
    dispatch(addComparison(newComparison));
  };

  return (
    <div className="history-item">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <h3>{month}</h3>
        <button
          onClick={() => handleDeleteHistoryItem(month, userName)}
          style={{
            marginLeft: '100px',
            fontStyle: 'bold',
            fontFamily: 'roboto',
            borderStyle: 'hidden',
          }}
        >
          ❌
        </button>
      </div>
      <p>
        <strong>Income:</strong> {income}€
      </p>
      <p>
        <strong>Rent Costs:</strong> {rentcosts}€
      </p>
      <p>
        <strong>Side Costs:</strong> {sidecosts}€
      </p>
      <p>
        <strong>Food and Drinks Costs:</strong> {foodanddrinkscosts}€
      </p>
      <p>
        <strong>Hobby Costs:</strong> {hobbycosts}€
      </p>
      <p>
        <strong>Savings Costs:</strong> {savingscosts}€
      </p>
      <p>
        <strong>Mobility Costs:</strong> {mobilitycosts}€
      </p>
      <p>
        <strong>Insurance Costs:</strong> {insurancecosts}€
      </p>
      <Button onClick={handleRestoreHistoryItem}>Vergleichen</Button>
    </div>
  );
}
