import '../../index.css';
import Button from '../../components/Button.jsx';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import Icon from '../../components/Icon.jsx';

export default function BudgetForm() {
  const [month, setMonth] = useState(new Date());
  const [income, setIncome] = useState('');
  const [rent, setRent] = useState('');
  const [sideCosts, setSideCosts] = useState('');
  const [foodAndDrinksCosts, setFoodAndDrinksCosts] = useState('');
  const [mobilityCosts, setMobilityCosts] = useState('');
  const [hobbyCosts, setHobbyCosts] = useState('');
  const [insuranceCosts, setInsuranceCosts] = useState('');
  const [monthlySavingsCosts, setMonthlySavingsCosts] = useState('');

  const textArr = [
    'TEST',
    'Test2',
    'Test3',
    'sdsdad',
    'dsadada',
    'dsadadsdsad',
    'dsadsadsada',
    'sdaasda',
    'dsadadsdsadsa',
  ];

  return (
    <div className="budgetform">
      <div className="header">
        <h2>Geben Sie ihre monatlichen Ausgaben an</h2>
        <div className="income-input-container">
          <label style={{ marginLeft: 200 }}>Zeitraum:</label>
          <DatePicker
            selected={month}
            dateFormat="MM/yyyy"
            onChange={(date) => setMonth(date)}
            showMonthYearPicker
            placeHolderText="Select a month"
          />
        </div>
      </div>
      <form>
        <label>Netto Einkommen *</label>
        <input
          type="text"
          className="einnahmen"
          value={income ? `${income}€` : ''}
          onChange={(e) => {
            // Regex to remove non-numeric characters and € symbol
            const rawValue = e.target.value.replace(/[^0-9]/g, '');
            setIncome(rawValue);
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
            setRent(rawValue);
          }}
        />
        <div className="tooltip-container">
          <Icon name="Question" text={textArr[2]} />
        </div>
        <label>Nebenkosten *</label>
        <input
          type="text"
          className="ausgaben"
          value={sideCosts ? `${sideCosts}€` : ''}
          onChange={(e) => {
            // Regex to remove non-numeric characters and € symbol
            const rawValue = e.target.value.replace(/[^0-9]/g, '');
            setSideCosts(rawValue);
          }}
        />
        <div className="tooltip-container">
          <Icon name="Question" text={textArr[3]} />
        </div>
        <label>Essen und Trinken *</label>
        <input
          type="text"
          className="ausgaben"
          value={foodAndDrinksCosts ? `${foodAndDrinksCosts}€` : ''}
          onChange={(e) => {
            // Regex to remove non-numeric characters and € symbol
            const rawValue = e.target.value.replace(/[^0-9]/g, '');
            setFoodAndDrinksCosts(rawValue);
          }}
        />
        <div className="tooltip-container">
          <Icon name="Question" text={textArr[4]} />
        </div>
        <label>Mobilität *</label>
        <input
          type="text"
          className="ausgaben"
          value={mobilityCosts ? `${mobilityCosts}€` : ''}
          onChange={(e) => {
            // Regex to remove non-numeric characters and € symbol
            const rawValue = e.target.value.replace(/[^0-9]/g, '');
            setMobilityCosts(rawValue);
          }}
        />

        <div className="tooltip-container">
          <Icon name="Question" text={textArr[5]} />
        </div>
        <label>Hobbies und Freizeit *</label>
        <input
          type="text"
          className="ausgaben"
          value={hobbyCosts ? `${hobbyCosts}€` : ''}
          onChange={(e) => {
            // Regex to remove non-numeric characters and € symbol
            const rawValue = e.target.value.replace(/[^0-9]/g, '');
            setHobbyCosts(rawValue);
          }}
        />
        <div className="tooltip-container">
          <Icon name="Question" text={textArr[6]} />
        </div>
        <label>Versicherungen *</label>
        <input
          type="text"
          className="ausgaben"
          value={insuranceCosts ? `${insuranceCosts}€` : ''}
          onChange={(e) => {
            // Regex to remove non-numeric characters and € symbol
            const rawValue = e.target.value.replace(/[^0-9]/g, '');
            setInsuranceCosts(rawValue);
          }}
        />
        <div className="tooltip-container">
          <Icon name="Question" text={textArr[7]} />
        </div>
        <label>Sparen </label>
        <input
          type="text"
          className="ausgaben"
          value={monthlySavingsCosts ? `${monthlySavingsCosts}€` : ''}
          onChange={(e) => {
            // Regex to remove non-numeric characters and € symbol
            const rawValue = e.target.value.replace(/[^0-9]/g, '');
            setMonthlySavingsCosts(rawValue);
          }}
        />
        <div className="tooltip-container">
          <Icon name="Question" text={textArr[8]} />
        </div>
      </form>
      <p>* Pflichtfelder</p>
      <p>Saldo: </p>
      <Button type="submit">Speichern</Button>
    </div>
  );
}
