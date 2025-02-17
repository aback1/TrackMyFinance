import React from 'react';
import Button from '../../components/Button.jsx';
import { createDispatchHook, useDispatch, useSelector } from 'react-redux';
import { useDeleteSavingsMutation } from './historyApi.js';
import { addComparison } from '../Comparison/comparisonSlice.js';
import SmallSpinner from '../../components/SmallSpinner.jsx';

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

  const [deleteSpending, { isLoading: isDeleting }] =
    useDeleteSavingsMutation();
  const userName = useSelector((state) => state.login.userName);
  const dispatch = useDispatch();

  const handleDeleteHistoryItem = async (month, userName) => {
    try {
      const newToDeleteSpending = {
        username: userName,
        month: month,
      };
      const response = await deleteSpending(newToDeleteSpending).unwrap();
      console.log(response);
      if (response.status === 'Spending record deleted successfully') {
        alert('Eintrag wurde gelöscht');
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
        {!isDeleting ? (
          <button
            onClick={() => handleDeleteHistoryItem(month, userName)}
            style={{
              marginLeft: '100px',
              fontStyle: 'bold',
              fontFamily: 'roboto',
              borderStyle: 'hidden',
              cursor: 'pointer',
            }}
          >
            ❌
          </button>
        ) : (
          <div style={{ marginLeft: '100px' }}>
            <SmallSpinner />
          </div>
        )}
      </div>
      <p>
        <strong>Einkommen:</strong> {income}€
      </p>
      <p>
        <strong>Miete:</strong> {rentcosts}€
      </p>
      <p>
        <strong>Nebenkosten:</strong> {sidecosts}€
      </p>
      <p>
        <strong>Essen und Trinken:</strong> {foodanddrinkscosts}€
      </p>
      <p>
        <strong>Hobbies und Freizeit:</strong> {hobbycosts}€
      </p>
      <p>
        <strong>Sparplan / Investitionen:</strong> {savingscosts}€
      </p>
      <p>
        <strong>Mobilität:</strong> {mobilitycosts}€
      </p>
      <p>
        <strong>Versicherungen:</strong> {insurancecosts}€
      </p>
      <Button className="button" onClick={handleRestoreHistoryItem}>
        Vergleichen
      </Button>
    </div>
  );
}
