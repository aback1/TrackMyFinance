import '../../index.css';
import Button from '../../components/Button.jsx';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from 'react';
import Icon from '../../components/Icon.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { usePostSavingsMutation } from '../History/historyApi.js';
import {
  addFoodAndDrinksCosts,
  addHobbyCosts,
  addIncome,
  addInsuranceCosts,
  addMobilityCosts,
  addMonth,
  addRentCosts,
  addSavingsCosts,
  addSideCosts,
  addSpendings,
} from './budgetSlice.js';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';

export default function BudgetForm() {
  // I keep the local state in here, because it is faster to render from local state
  const [month, setMonth] = useState(new Date());
  const [formattedMonth, setFormattedMonth] = useState('02-2025');
  const [income, setIncome] = useState(0);
  const [rent, setRent] = useState(0);
  const [sideCosts, setSideCosts] = useState(0);
  const [foodAndDrinksCosts, setFoodAndDrinksCosts] = useState(0);
  const [mobilityCosts, setMobilityCosts] = useState(0);
  const [hobbyCosts, setHobbyCosts] = useState(0);
  const [insuranceCosts, setInsuranceCosts] = useState(0);
  const [monthlySavingsCosts, setMonthlySavingsCosts] = useState(0);
  const [saldo, setSaldo] = useState(0);

  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const userName = useSelector((state) => state.login.userName);
  const dispatch = useDispatch();

  const [postSpendings, { isLoading }] = usePostSavingsMutation();

  const textArr = [
    'Das Nettoeinkommen bezieht sich auf Ihr Gehalt sowie alle Nebeneinkünfte nach Abzug der Steuern. Geben Sie den Betrag an, der Ihnen monatlich tatsächlich ausgezahlt wird.Berücksichtigen Sie auch regelmäßige zusätzliche Einnahmen wie Boni oder Provisionen.Falls Sie den exakten Wert nicht kennen, schätzen Sie bitte den monatlichen Nettobetrag ',
    'Die Mietkosten umfassen den monatlichen Betrag, den Sie für Ihre Wohnung oder Ihr Haus zahlen. Geben Sie ausschließlich die reine Miete an, ohne Nebenkosten, sofern diese separat erfasst werden. Falls in Ihrer Miete bereits Nebenkosten enthalten sind, sollten Sie dies in Ihrer Kalkulation berücksichtigen. Falls Unsicherheiten bestehen, schätzen Sie den monatlichen Mietpreis.',
    'Die Nebenkosten beinhalten Ausgaben für Strom, Wasser, Heizung, Müllabfuhr und andere laufende Kosten.\n' +
      'Geben Sie den durchschnittlichen Betrag an, den Sie monatlich hierfür aufwenden.\n' +
      'Berücksichtigen Sie, dass diese Kosten je nach Verbrauch variieren können.\n' +
      'Falls Sie den exakten Betrag nicht kennen, geben Sie bitte einen realistischen Schätzwert an.',
    'Hier sollten Sie alle Ausgaben für Lebensmittel, Getränke und Restaurantbesuche eintragen.\n' +
      'Geben Sie den monatlichen Durchschnittswert an, den Sie für Ihre Ernährung ausgeben.\n' +
      'Denken Sie daran, sowohl Supermarkteinkäufe als auch gelegentliche Restaurantbesuche einzubeziehen.\n' +
      'Falls Sie den genauen Betrag nicht kennen, schätzen Sie ihn bitte basierend auf Ihren bisherigen Ausgaben.\n',
    'Die Mobilitätskosten umfassen alle Ausgaben im Zusammenhang mit Ihrem Transport, wie Benzin, Tickets für öffentliche Verkehrsmittel oder Wartungskosten.\n' +
      'Geben Sie den monatlichen Betrag an, den Sie für Ihre Mobilität aufwenden.\n' +
      'Falls Sie mehrere Verkehrsmittel nutzen, addieren Sie bitte die entsprechenden Kosten.\n' +
      'Schätzen Sie den Betrag, falls er monatlich variiert.',
    'Unter Hobbies und Freizeit fallen alle Ausgaben, die Sie für Ihre persönlichen Interessen und Aktivitäten tätigen.\n' +
      'Dazu gehören Kosten für Sport, Kultur, Freizeitaktivitäten oder auch Mitgliedschaften in Vereinen.\n' +
      'Geben Sie den durchschnittlichen monatlichen Betrag an, den Sie hierfür ausgeben.\n' +
      'Falls Sie nicht den exakten Betrag wissen, schätzen Sie bitte den üblichen Monatswert.',
    'Versicherungen umfassen regelmäßige Beiträge für Kranken-, Auto-, Hausrat- und andere Versicherungen.\n' +
      'Geben Sie den monatlichen Durchschnittsbetrag an, den Sie für all Ihre Versicherungen zahlen.\n' +
      'Falls einige Versicherungen nur jährlich oder vierteljährlich gezahlt werden, berechnen Sie einen entsprechenden Monatsdurchschnitt.\n' +
      'Schätzen Sie den Betrag, wenn Sie nicht genau wissen, wie hoch Ihre monatlichen Ausgaben sind.',
    'Beim Sparen handelt es sich um den Betrag, den Sie monatlich zur Seite legen oder investieren möchten.\n' +
      'Geben Sie an, wie viel Geld Sie bewusst für Rücklagen oder Investitionen zurückstellen.\n' +
      'Berücksichtigen Sie dabei alle Sparformen, sei es auf einem Sparkonto, in Fonds oder anderen Anlageformen.\n' +
      'Falls Sie sich unsicher sind, wählen Sie bitte einen Betrag, der realistisch zu Ihren finanziellen Zielen passt.',
  ];

  const handleUpdateMonth = (date) => {
    setMonth(date);
    let formattedDate = date.toISOString().slice(0, 7);
    let monthSubString = formattedDate.substring(5, 7);
    let yearSubString = formattedDate.substring(0, 4);
    setFormattedMonth(`${monthSubString}-${yearSubString}`);
    dispatch(addMonth(`${monthSubString}-${yearSubString}`));
  };

  const handleSubmitSpendings = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert(
        'Sie müssen eingeloggt sein, damit Sie ihre Ausgaben tracken können!'
      );
      return null;
    }
    try {
      let response;
      console.log(formattedMonth);
      const newSpendings = {
        username: userName,
        month: formattedMonth,
        income,
        rentcosts: rent,
        sidecosts: sideCosts,
        foodanddrinkscosts: foodAndDrinksCosts,
        hobbycosts: hobbyCosts,
        savingscosts: monthlySavingsCosts,
        mobilitycosts: mobilityCosts,
        insurancecosts: insuranceCosts,
      };
      response = await postSpendings(newSpendings).unwrap();
      if (response.ok) {
        alert('Daten erfolgreich übermittelt.');
        dispatch(addSpendings(newSpendings));
      }
    } catch (error) {
      alert(error?.data.error[0]);
    }
  };

  //UseEffect to compute the difference between the income and all the expenses
  //a different approach having all the state in the store and subscribing to it with a useSelectorHook
  //would result in rerenders for each calling of the dispatch function, so it would yield the same result
  //as a useEffect hook.
  useEffect(() => {
    const combinedCosts =
      rent +
      sideCosts +
      foodAndDrinksCosts +
      mobilityCosts +
      hobbyCosts +
      insuranceCosts +
      monthlySavingsCosts;
    setSaldo(income - combinedCosts);
  }, [
    rent,
    sideCosts,
    foodAndDrinksCosts,
    mobilityCosts,
    hobbyCosts,
    insuranceCosts,
    monthlySavingsCosts,
    saldo,
    month,
  ]);
  return (
    <div className="budgetform">
      <div className="header">
        <h2>Geben Sie ihre monatlichen Einnahmen und Ausgaben an</h2>
        <div className="date-input-container">
          <label>Zeitraum:</label>
          <DatePicker
            wrapperClassName="datePicker"
            selected={month}
            dateFormat="MM/yyyy"
            onChange={(date) => handleUpdateMonth(date)}
            showMonthYearPicker
            placeHolderText="Select a month"
          />
        </div>
      </div>
      <form onSubmit={(e) => handleSubmitSpendings(e)} id="savingsform">
        <label>Netto Einkommen *</label>
        <input
          type="text"
          className="einnahmen"
          value={income ? `${income}€` : ''}
          onChange={(e) => {
            // Regex to remove non-numeric characters and € symbol
            const rawValue = e.target.value.replace(/[^0-9]/g, '');
            const numericValue = Number(rawValue);
            setIncome(numericValue);
            dispatch(addIncome(numericValue));
          }}
        />
        <div className="tooltip-container">
          <Icon name="Question" text={textArr[0]} />
        </div>

        <label>Mietkosten *</label>
        <input
          type="text"
          className="ausgaben"
          value={rent ? `${rent}€` : ''}
          onChange={(e) => {
            // Regex to remove non-numeric characters and € symbol
            const rawValue = e.target.value.replace(/[^0-9]/g, '');
            const numericValue = Number(rawValue);
            setRent(numericValue);
            dispatch(addRentCosts(numericValue));
          }}
        />
        <div className="tooltip-container">
          <Icon name="Question" text={textArr[1]} />
        </div>
        <label>Nebenkosten *</label>
        <input
          type="text"
          className="ausgaben"
          value={sideCosts ? `${sideCosts}€` : ''}
          onChange={(e) => {
            // Regex to remove non-numeric characters and € symbol
            const rawValue = e.target.value.replace(/[^0-9]/g, '');
            const numericValue = Number(rawValue);
            setSideCosts(numericValue);
            dispatch(addSideCosts(numericValue));
          }}
        />
        <div className="tooltip-container">
          <Icon name="Question" text={textArr[2]} />
        </div>
        <label>Essen und Trinken *</label>
        <input
          type="text"
          className="ausgaben"
          value={foodAndDrinksCosts ? `${foodAndDrinksCosts}€` : ''}
          onChange={(e) => {
            // Regex to remove non-numeric characters and € symbol
            const rawValue = e.target.value.replace(/[^0-9]/g, '');
            const numericValue = Number(rawValue);
            setFoodAndDrinksCosts(numericValue);
            dispatch(addFoodAndDrinksCosts(numericValue));
          }}
        />
        <div className="tooltip-container">
          <Icon name="Question" text={textArr[3]} />
        </div>
        <label>Mobilität *</label>
        <input
          type="text"
          className="ausgaben"
          value={mobilityCosts ? `${mobilityCosts}€` : ''}
          onChange={(e) => {
            // Regex to remove non-numeric characters and € symbol
            const rawValue = e.target.value.replace(/[^0-9]/g, '');
            const numericValue = Number(rawValue);
            setMobilityCosts(numericValue);
            dispatch(addMobilityCosts(numericValue));
          }}
        />

        <div className="tooltip-container">
          <Icon name="Question" text={textArr[4]} />
        </div>
        <label>Hobbies und Freizeit *</label>
        <input
          type="text"
          className="ausgaben"
          value={hobbyCosts ? `${hobbyCosts}€` : ''}
          onChange={(e) => {
            // Regex to remove non-numeric characters and € symbol
            const rawValue = e.target.value.replace(/[^0-9]/g, '');
            const numericValue = Number(rawValue);
            setHobbyCosts(numericValue);
            dispatch(addHobbyCosts(numericValue));
          }}
        />
        <div className="tooltip-container">
          <Icon name="Question" text={textArr[5]} />
        </div>
        <label>Versicherungen *</label>
        <input
          type="text"
          className="ausgaben"
          value={insuranceCosts ? `${insuranceCosts}€` : ''}
          onChange={(e) => {
            // Regex to remove non-numeric characters and € symbol
            const rawValue = e.target.value.replace(/[^0-9]/g, '');
            const numericValue = Number(rawValue);
            setInsuranceCosts(numericValue);
            dispatch(addInsuranceCosts(numericValue));
          }}
        />
        <div className="tooltip-container">
          <Icon name="Question" text={textArr[6]} />
        </div>
        <label>Sparen </label>
        <input
          type="text"
          className="ausgaben"
          value={monthlySavingsCosts ? `${monthlySavingsCosts}€` : ''}
          onChange={(e) => {
            // Regex to remove non-numeric characters and € symbol
            const rawValue = e.target.value.replace(/[^0-9]/g, '');
            const numericValue = Number(rawValue);
            setMonthlySavingsCosts(numericValue);
            dispatch(addSavingsCosts(numericValue));
          }}
        />
        <div className="tooltip-container">
          <Icon name="Question" text={textArr[7]} />
        </div>
      </form>
      <p>* Pflichtfelder</p>
      <p>Saldo: {saldo}€</p>
      {!isLoading ? (
        <Button type="submit" formId="savingsform" className="button">
          Speichern
        </Button>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}
