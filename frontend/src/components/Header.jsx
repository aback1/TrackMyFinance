import LoginModal from '../features/Login/LoginModal.jsx';
import Button from './Button.jsx';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  return (
    <div className="header-container" style={{ marginRight: '140px' }}>
      <Button className="button" onClick={() => navigate('/')}>
        <Link to="/" className="custom-link">
          Home
        </Link>
      </Button>

      <Button className="button" onClick={() => navigate('/about')}>
        <Link to="/about" className="custom-link">
          About
        </Link>
      </Button>
      <header>
        <h1>Budget planen und Geld sparen.</h1>
      </header>
    </div>
  );
}
