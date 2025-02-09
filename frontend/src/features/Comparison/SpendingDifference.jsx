import { useSelector } from 'react-redux';

export default function SpendingDifference() {
  const comparison = useSelector((state) => state.comparison);
  const currentIncome = useSelector((state) => state.spendings.income);

  const {
    income,
    rentcosts,
    sidecosts,
    foodanddrinkscosts,
    hobbycosts,
    savingscosts,
    mobilitycosts,
    insurancecosts,
  } = comparison;

  return <></>;
}
