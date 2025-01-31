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

  console.log(month);
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
        <Icon name="Question" />
        <label>Mietkosten</label>
        <input type="text" className="ausgaben" />
        <Icon name="Question" />
        <label>Nebenkosten *</label>
        <input type="text" className="ausgaben" />
        <Icon name="Question" />
        <label>Essen und Trinken *</label>
        <input type="text" className="ausgaben" />
        <Icon name="Question" />
        <label>Mobilität</label>
        <input type="text" className="ausgaben" />
        <Icon name="Question" />
        <label>Hobbies und Freizeit</label>
        <input type="text" className="ausgaben" />
        <Icon name="Question" />
        <label>Versicherungen </label>
        <input type="text" className="ausgaben" />
        <Icon name="Question" />
        <label>Sparen</label>
        <input type="text" className="ausgaben" />
        <Icon name="Question" />
      </form>
      <p>* Pflichtfelder</p>
      <p>Saldo: </p>
      <Button type="submit">Speichern</Button>
    </div>
  );
}
