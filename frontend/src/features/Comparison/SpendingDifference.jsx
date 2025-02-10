import { useSelector } from 'react-redux';

export default function SpendingDifference() {
  const comparisonFinance = useSelector((state) => state.comparison);
  const currentFinance = useSelector((state) => state.budget);

  const {
    income,
    rentcosts,
    sidecosts,
    foodanddrinkscosts,
    hobbycosts,
    savingscosts,
    mobilitycosts,
    insurancecosts,
  } = comparisonFinance;

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

  const calculatePercentageDifference = (current, previous) => {
    if (previous === 0) return '';
    const difference = ((current - previous) / previous) * 100;
    const differenceRounded = difference.toFixed(2);
    return differenceRounded >= 0 ? '+' + differenceRounded : differenceRounded;
  };

  const getDifferenceStyle = (difference) => {
    if (difference === '') return {};
    return {
      color: difference >= 0 ? 'red' : 'green',
    };
  };

  const getIncomeStyle = (difference) => {
    if (difference === '') return {};
    return {
      color: difference >= 0 ? 'green' : 'red',
    };
  };

  return (
    <div style={{ fontSize: 'larger' }}>
      <h2>Vergleich mit aktuellen Ausgaben</h2>
      <p>
        Einkommen Unterschied:{' '}
        <span
          style={getIncomeStyle(
            calculatePercentageDifference(currentIncome, income)
          )}
        >
          {calculatePercentageDifference(currentIncome, income)}%
        </span>
      </p>
      <p>
        Miete Unterschied:{' '}
        <span
          style={getDifferenceStyle(
            calculatePercentageDifference(currentRentCosts, rentcosts)
          )}
        >
          {calculatePercentageDifference(currentRentCosts, rentcosts)}%
        </span>
      </p>
      <p>
        Nebenkosten Unterschied:{' '}
        <span
          style={getDifferenceStyle(
            calculatePercentageDifference(currentSideCosts, sidecosts)
          )}
        >
          {calculatePercentageDifference(currentSideCosts, sidecosts)}%
        </span>
      </p>
      <p>
        Essen und Trinken Unterschied:{' '}
        <span
          style={getDifferenceStyle(
            calculatePercentageDifference(
              currentFoodAndDrinksCosts,
              foodanddrinkscosts
            )
          )}
        >
          {calculatePercentageDifference(
            currentFoodAndDrinksCosts,
            foodanddrinkscosts
          )}
          %
        </span>
      </p>
      <p>
        Hobbies und Freizeit Unterschied:{' '}
        <span
          style={getDifferenceStyle(
            calculatePercentageDifference(currentHobbyCosts, hobbycosts)
          )}
        >
          {calculatePercentageDifference(currentHobbyCosts, hobbycosts)}%
        </span>
      </p>
      <p>
        Sparen Unterschied:{' '}
        <span
          style={getDifferenceStyle(
            calculatePercentageDifference(currentSavingsCosts, savingscosts)
          )}
        >
          {calculatePercentageDifference(currentSavingsCosts, savingscosts)}%
        </span>
      </p>
      <p>
        Mobilität Unterschied:{' '}
        <span
          style={getDifferenceStyle(
            calculatePercentageDifference(currentMobilityCosts, mobilitycosts)
          )}
        >
          {calculatePercentageDifference(currentMobilityCosts, mobilitycosts)}%
        </span>
      </p>
      <p>
        Versicherungen Unterschied:{' '}
        <span
          style={getDifferenceStyle(
            calculatePercentageDifference(currentInsuranceCosts, insurancecosts)
          )}
        >
          {calculatePercentageDifference(currentInsuranceCosts, insurancecosts)}
          %
        </span>
      </p>
    </div>
  );
}
