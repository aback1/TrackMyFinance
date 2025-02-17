import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import BudgetForm from '../features/BudgetForm/BudgetForm.jsx';
import History from '../features/History/History.jsx';
import LoginModal from '../features/Login/LoginModal.jsx';
import SpendingComparison from '../features/Comparison/SpendingComparison.jsx';
import DataProtectionDeclaration from '../components/DataProtectionDeclaration.jsx';
import ContactInformation from '../components/ContactInformation.jsx';
import About from '../components/About.jsx';

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
        <Route
          path="/impressum"
          element={
            <div className="container">
              <div className="empty"></div>
              <Header />
              <LoginModal />
              <ContactInformation />
              <Footer />
            </div>
          }
        />
        <Route
          path="/about"
          element={
            <div className="container">
              <div className="empty"></div>
              <Header />
              <LoginModal />
              <About />
              <Footer />
            </div>
          }
        />
        <Route
          path="/datenschutzerklärung"
          element={
            <div className="container">
              <div className="empty"></div>
              <Header />
              <LoginModal />
              <DataProtectionDeclaration />
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
