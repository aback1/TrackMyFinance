import Button from '../../components/Button.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  setShowLoginForm,
  setPassword,
  setUserName,
  setIsLoggedIn,
} from './loginSlice.js';
import { useLoginUserMutation, useRegisterUserMutation } from './loginApi.js';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';

export default function LoginForm() {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.login.userName);
  const password = useSelector((state) => state.login.password);

  const handleUpdateUserName = (e) => dispatch(setUserName(e.target.value));
  const handleUpdatePassword = (e) => dispatch(setPassword(e.target.value));
  const [loginUser, { isLoading: isLoggingIn }] = useLoginUserMutation();
  const [registerUser, { isLoading: isRegistering }] =
    useRegisterUserMutation();

  const handleSubmit = async (action) => {
    const newCredentials = {
      name: userName,
      password: password,
    };
    try {
      let response;
      if (action === 'register') {
        response = await registerUser(newCredentials).unwrap();
        if (response.status === 'User created successfully') {
          alert(
            'Die Registrierung war erfolgreich Sie können sich jetzt mit ihren gewählten Benuzernahmen und Passwort anmelden.'
          );
        }
        console.log(response.status);
      } else if (action === 'login') {
        response = await loginUser(newCredentials).unwrap();

        //the lexik jwt sends a token if the login was successful.
        if (response.token) {
          alert('Login erfolgreich.');
          dispatch(setIsLoggedIn(true));
          dispatch(setShowLoginForm(false));
        }
      }
    } catch (error) {
      console.log(response.token);
      console.log(error);
      alert(error?.data?.message);
    }
  };

  return (
    <>
      <form className="budgetform login">
        <h2>Account Management</h2>
        <label>Benutzername *</label>
        <input
          type="text"
          className="login"
          value={userName}
          onChange={(e) => handleUpdateUserName(e)}
          style={{ width: '100%' }}
        />
        <label>Passwort *</label>
        <input
          type="password"
          className="login"
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
          <div style={{ display: 'flex', gap: '10px' }}>
            {!isLoggingIn ? (
              <Button
                type="submit"
                className="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit('login');
                }}
              >
                Login
              </Button>
            ) : (
              <LoadingSpinner />
            )}
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {!isRegistering ? (
              <Button
                type="submit"
                className="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit('register');
                }}
                style={{
                  background:
                    'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                }}
              >
                Registrieren
              </Button>
            ) : (
              <LoadingSpinner />
            )}
          </div>
        </div>
        <div>
          <Button
            type="button"
            className="button"
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
