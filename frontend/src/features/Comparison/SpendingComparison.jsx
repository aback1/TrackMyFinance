import { useSelector } from 'react-redux';

export default function SpendingComparison() {
  const comparison = useSelector((state) => state.comparison);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  const {
    month,
    income,
    rentcosts,
    sidecosts,
    foodanddrinkcosts,
    hobbycosts,
    savingscosts,
    insurancecosts,
  } = comparison;

  console.log(month);
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
      <p>Essen und Trinken: {foodanddrinkcosts}€</p>
      <p>Hobbies und Freizeit: {hobbycosts}€</p>
      <p>Sparen: {savingscosts}€</p>
      <p>Versicherungen: {insurancecosts}€</p>
    </div>
  );
}
