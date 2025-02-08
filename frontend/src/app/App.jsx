import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import BudgetForm from '../features/BudgetForm/BudgetForm.jsx';
import History from '../features/History/History.jsx';
import LoginModal from '../features/Login/LoginModal.jsx';
import SpendingComparison from '../features/Comparison/SpendingComparison.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="container">
              <div className="empty"></div>
              <Header />
              <LoginModal />
              <BudgetForm />
              <SpendingComparison />
              <History />
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
