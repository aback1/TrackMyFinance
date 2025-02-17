import { useSelector } from 'react-redux';
import SpendingDifference from './SpendingDifference.jsx';
import { PieChart } from 'react-minimal-pie-chart';

export default function SpendingComparison() {
  const comparison = useSelector((state) => state?.comparison);
  const currentFinance = useSelector((state) => state?.budget);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  const {
    month,
    income: comparisonIncome,
    rentcosts,
    sidecosts,
    foodanddrinkscosts,
    hobbycosts,
    mobilitycosts,
    savingscosts,
    insurancecosts,
  } = comparison;

  const {
    income: currentIncome,
    rentcosts: currentRentCosts,
    sidecosts: currentSideCosts,
    foodanddrinkscosts: currentFoodAndDrinksCosts,
    hobbycosts: currentHobbyCosts,
    savingscosts: currentSavingsCosts,
    mobilitycosts: currentMobilityCosts,
    insurancecosts: currentInsuranceCosts,
  } = currentFinance;

  // Calculate percentages for current spendings
  const calculatePercentage = (value, totalIncome) => {
    return ((value / totalIncome) * 100).toFixed(2);
  };

  // Data for current spendings pie chart (percentages of income)
  //parse float takes a string and tunrs it into a floating point number without precision.
  const currentSpendingsData = [
    {
      title: 'Miete',
      value: parseFloat(calculatePercentage(currentRentCosts, currentIncome)),
      color: '#E38627',
    },
    {
      title: 'Nebenkosten',
      value: parseFloat(calculatePercentage(currentSideCosts, currentIncome)),
      color: '#C13C37',
    },
    {
      title: 'Essen & Trinken',
      value: parseFloat(
        calculatePercentage(currentFoodAndDrinksCosts, currentIncome)
      ),
      color: '#6A2135',
    },
    {
      title: 'Hobbies & Freizeit',
      value: parseFloat(calculatePercentage(currentHobbyCosts, currentIncome)),
      color: '#FF8C42',
    },
    {
      title: 'Sparen',
      value: parseFloat(
        calculatePercentage(currentSavingsCosts, currentIncome)
      ),
      color: '#4CAF50',
    },
    {
      title: 'Mobilität',
      value: parseFloat(
        calculatePercentage(currentMobilityCosts, currentIncome)
      ),
      color: '#2196F3',
    },
    {
      title: 'Versicherungen',
      value: parseFloat(
        calculatePercentage(currentInsuranceCosts, currentIncome)
      ),
      color: '#9C27B0',
    },
  ];

  // Data for comparison spendings pie chart (percentages of income)
  const comparisonSpendingsData = [
    {
      title: 'Miete',
      value: parseFloat(calculatePercentage(rentcosts, comparisonIncome)),
      color: '#E38627',
    },
    {
      title: 'Nebenkosten',
      value: parseFloat(calculatePercentage(sidecosts, comparisonIncome)),
      color: '#C13C37',
    },
    {
      title: 'Essen & Trinken',
      value: parseFloat(
        calculatePercentage(foodanddrinkscosts, comparisonIncome)
      ),
      color: '#6A2135',
    },
    {
      title: 'Hobbies & Freizeit',
      value: parseFloat(calculatePercentage(hobbycosts, comparisonIncome)),
      color: '#FF8C42',
    },
    {
      title: 'Sparen',
      value: parseFloat(calculatePercentage(savingscosts, comparisonIncome)),
      color: '#4CAF50',
    },
    {
      title: 'Mobilität',
      value: parseFloat(calculatePercentage(mobilitycosts, comparisonIncome)),
      color: '#2196F3',
    },
    {
      title: 'Versicherungen',
      value: parseFloat(calculatePercentage(insurancecosts, comparisonIncome)),
      color: '#9C27B0',
    },
  ];

  // Data for average household spendings in Germany (in percentages)
  // Source: https://www.destatis.de/DE/Themen/Gesellschaft-Umwelt/Einkommen-Konsum-Lebensbedingungen/Konsumausgaben-Lebenshaltungskosten/_inhalt.html
  const averageSpendingsData = [
    { title: 'Miete', value: 27.8, color: '#E38627' },
    { title: 'Nebenkosten', value: 8.8, color: '#C13C37' },
    { title: 'Essen & Trinken', value: 15, color: '#6A2135' },
    { title: 'Hobbies & Freizeit', value: 21, color: '#FF8C42' },
    { title: 'Versicherungen', value: 12, color: '#9C27B0' },
    { title: 'Mobilität', value: 12, color: '#2196F3' },
    { title: 'Sparen', value: 10.4, color: '#4CAF50' },
  ];

  if (!isLoggedIn || !comparison.month) {
    return (
      <>
        <h2>Vergleichen Sie ihre Finanzen</h2>
      </>
    );
  }

  return (
    <div className="spending-comparison">
      <h2>Finanzvergleich</h2>

      <h3 style={{ textDecoration: 'underline' }}>Zeitraum: {month}</h3>
      {<SpendingDifference />}

      {/* Pie Charts */}
      <div className="charts-container">
        <div className="chart">
          <h3>Aktuelle Ausgaben (% des Einkommens)</h3>
          <PieChart
            data={currentSpendingsData}
            label={({ dataEntry }) => `${dataEntry.title}: ${dataEntry.value}%`}
            labelStyle={{ fontSize: '4px' }}
          />
        </div>

        <div className="chart">
          <h3>Vergleichsausgaben ({month}) (% des Einkommens)</h3>
          <PieChart
            data={comparisonSpendingsData}
            label={({ dataEntry }) => `${dataEntry.title}: ${dataEntry.value}%`}
            labelStyle={{ fontSize: '4px' }}
          />
        </div>

        <div className="chart">
          <h3>Durchschnittliche Haushaltsausgaben (Deutschland)</h3>
          <a
            href="https://www.destatis.de/DE/Themen/Gesellschaft-Umwelt/Einkommen-Konsum-Lebensbedingungen/Konsumausgaben-Lebenshaltungskosten/_inhalt.html"
            target="_blank"
            rel="noopener noreferrer"
            className="reference-link"
          >
            Quelle: Destatis
          </a>
          <PieChart
            data={averageSpendingsData}
            label={({ dataEntry }) => `${dataEntry.title}: ${dataEntry.value}%`}
            labelStyle={{ fontSize: '4px' }}
          />
        </div>
      </div>
    </div>
  );
}
