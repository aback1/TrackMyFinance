import { useSelector } from 'react-redux';
import SpendingDifference from './SpendingDifference.jsx';

export default function SpendingComparison() {
  const comparison = useSelector((state) => state?.comparison);
  const currentFinance = useSelector((state) => state?.budget);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  const {
    month,
    income,
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

  const calculateTotalDifference = () => {
    const totalComparison =
      Number(income) +
      Number(rentcosts) +
      Number(sidecosts) +
      Number(foodanddrinkscosts) +
      Number(hobbycosts) +
      Number(savingscosts) +
      Number(mobilitycosts) +
      Number(insurancecosts);
    console.log(totalComparison);

    const totalCurrent =
      currentIncome +
      currentRentCosts +
      currentSideCosts +
      currentFoodAndDrinksCosts +
      currentHobbyCosts +
      currentSavingsCosts +
      currentMobilityCosts +
      currentInsuranceCosts;
    console.log(totalCurrent);
    /*  console.log(totalCurrent);
    console.log(income);
    console.log({ totalComparison });*/
    return Number(totalCurrent - totalComparison);
  };

  const totalDifference = calculateTotalDifference();

  if (!isLoggedIn || !comparison.month) {
    return (
      <>
        <h2>Vergleichen Sie ihre Finanzen</h2>
      </>
    );
  }

  return (
    <div className="spending-comparison">
      <h2>Vergleichen Sie ihre Finanzen</h2>
      <h3 style={{ textDecoration: 'underline' }}>Zeitraum: {month}</h3>
      <p>Einkommen: {income}€</p>
      <p>Miete: {rentcosts}€</p>
      <p>Nebenkosten: {sidecosts}€</p>
      <p>Essen und Trinken: {foodanddrinkscosts}€</p>
      <p>Hobbies und Freizeit: {hobbycosts}€</p>
      <p>Sparen: {savingscosts}€</p>
      <p>Versicherungen: {insurancecosts}€</p>
      <SpendingDifference />
      <h2>Gesamtvergleich</h2>
      <p style={{ color: totalDifference >= 0 ? 'green' : 'red' }}>
        Gesamtunterschied:{' '}
        {totalDifference > 0 ? `+${totalDifference}` : totalDifference}€
      </p>
    </div>
  );
}
