import { useGetSavingsQuery } from './historyApi.js';
import HistoryItem from './HistoryItem.jsx';
import { useSelector } from 'react-redux';

export default function History() {
  const userName = useSelector((state) => state.login?.userName) || '';
  const isLoggedIn = useSelector((state) => state.login?.isLoggedIn) || false;
  const {
    data: spendingsHistory,
    error,
    isLoading,
  } = useGetSavingsQuery(userName, { skip: !userName });

  return (
    <>
      {isLoggedIn && (
        <div className="history">
          <h2 style={{ marginLeft: '20px' }}>Ihre Finanzhistorie</h2>
          {spendingsHistory?.map((spending) => (
            <HistoryItem key={spending.month} spending={spending} />
          ))}
        </div>
      )}
    </>
  );
}
