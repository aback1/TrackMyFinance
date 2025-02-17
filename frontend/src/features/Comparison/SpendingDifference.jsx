import { useSelector } from 'react-redux';

export default function SpendingDifference() {
  const comparisonFinance = useSelector((state) => state.comparison);
  const currentFinance = useSelector((state) => state.budget);

  // Helper function to calculate percentage of income
  const calculatePercentage = (value, income) => {
    return income > 0 ? ((value / income) * 100).toFixed(2) + '%' : '-';
  };

  //improvement green worsening red
  const getValueStyle = (current, comparison) => {
    if (current > comparison) return { color: 'red' };
    if (current < comparison) return { color: 'green' };
    return {};
  };

  const categories = [
    { key: 'rentcosts', label: 'Miete' },
    { key: 'sidecosts', label: 'Nebenkosten' },
    { key: 'foodanddrinkscosts', label: 'Essen & Trinken' },
    { key: 'hobbycosts', label: 'Hobbies & Freizeit' },
    { key: 'savingscosts', label: 'Sparen' },
    { key: 'mobilitycosts', label: 'Mobilität' },
    { key: 'insurancecosts', label: 'Versicherungen' },
  ];

  return (
    <div className="comparison-table">
      <h2>Monatlicher Vergleich</h2>

      <table>
        <thead>
          <tr>
            <th>Kategorie</th>
            <th>Aktueller Monat</th>
            <th>Vergleichsmonat</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Einkommen</td>
            <td style={{ color: 'green' }}>{currentFinance.income}€</td>
            <td style={{ color: 'green' }}>{comparisonFinance.income}€</td>
          </tr>

          {categories.map(({ key, label }) => (
            <tr key={key}>
              <td>{label}</td>
              <td
                style={getValueStyle(
                  currentFinance[key],
                  comparisonFinance[key]
                )}
              >
                {currentFinance[key]}€
                <div className="percentage">
                  (
                  {calculatePercentage(
                    currentFinance[key],
                    currentFinance.income
                  )}
                  )
                </div>
              </td>
              <td
                style={getValueStyle(
                  comparisonFinance[key],
                  currentFinance[key]
                )}
              >
                {comparisonFinance[key]}€
                <div className="percentage">
                  (
                  {calculatePercentage(
                    comparisonFinance[key],
                    comparisonFinance.income
                  )}
                  )
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
