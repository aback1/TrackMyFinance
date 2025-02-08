import Button from '../../components/Button.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  setShowLoginForm,
  setPassword,
  setUserName,
  setIsLoggedIn,
} from './loginSlice.js';
import { useLoginUserMutation, useRegisterUserMutation } from './loginApi.js';

export default function LoginForm() {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.login.userName);
  const password = useSelector((state) => state.login.password);

  const handleUpdateUserName = (e) => dispatch(setUserName(e.target.value));
  const handleUpdatePassword = (e) => dispatch(setPassword(e.target.value));
  const [loginUser] = useLoginUserMutation();
  const [registerUser] = useRegisterUserMutation();

  const handleSubmit = async (action) => {
    const newCredentials = {
      name: userName,
      password: password,
    };
    try {
      let response;
      if (action === 'register') {
        response = await registerUser(newCredentials).unwrap();
        if (response.ok) {
          alert(
            'Die Registrierung war erfolgreich Sie können sich jetzt mit ihren gewählten Benuzernahmen und Passwort anmelden.'
          );
        }
        console.log('Registration successful');
      } else if (action === 'login') {
        response = await loginUser(newCredentials).unwrap();
        dispatch(setIsLoggedIn(true));
        console.log('Login successful', response);
      }
    } catch (error) {
      console.log(`${action} failed`, error);
    }
  };

  return (
    <>
      <form className="budgetform">
        <h2>Account Management</h2>
        <label>Benutzername *</label>
        <input
          type="text"
          className="ausgaben"
          value={userName}
          onChange={(e) => handleUpdateUserName(e)}
          style={{ width: '100%' }}
        />
        <label>Passwort *</label>
        <input
          type="password"
          className="ausgaben"
          value={password}
          onChange={(e) => handleUpdatePassword(e)}
          style={{ width: '100%' }}
        />{' '}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginTop: '20px',
          }}
        >
          <div
            style={{ display: 'flex', gap: '10px' }}
            className="alert alert-info"
          >
            <Button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit('login');
              }}
            >
              Login
            </Button>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit('register');
              }}
              style={{
                background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
              }}
            >
              Registrieren
            </Button>
          </div>
        </div>
        <div>
          <Button
            type="button"
            onClick={() => dispatch(setShowLoginForm(false))}
            style={{
              background: 'linear-gradient(135deg, #ff6b6b 0%, #ff0000 100%)',
            }}
          >
            Schließen
          </Button>
        </div>
      </form>
    </>
  );
}
