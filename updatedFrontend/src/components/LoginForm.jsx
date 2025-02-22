import Button from "./Button.jsx";
import { useDispatch, useSelector } from 'react-redux';
import {
    setShowLoginForm,
    setPassword,
    setUserName,
    setIsLoggedIn,
} from '../features/login/loginSlice';
import { useLoginUserMutation, useRegisterUserMutation } from '../features/login/loginApi.js';
import LoadingSpinner from './LoadingSpinner.jsx';

export default function LoginForm() {
    const dispatch = useDispatch();
    const userName = useSelector((state) => state.login.userName);
    const password = useSelector((state) => state.login.password);

    const handleUpdateUserName = (e) => dispatch(setUserName(e.target.value));
    const handleUpdatePassword = (e) => dispatch(setPassword(e.target.value));

    const [loginUser, { isLoading: isLoggingIn }] = useLoginUserMutation();
    const [registerUser, { isLoading: isRegistering }] = useRegisterUserMutation();

    const handleSubmit = async (action) => {
        // Changed key from 'name' to 'username' to match backend expectations
        const newCredentials = {
            username: userName,
            password: password,
        };

        try {
            let response;
            if (action === 'register') {
                response = await registerUser(newCredentials).unwrap();
                if (response.status === 'User created successfully') {
                    alert(
                        'Die Registrierung war erfolgreich. Sie können sich jetzt anmelden.'
                    );
                }
            } else if (action === 'login') {
                response = await loginUser(newCredentials).unwrap();
                if (response.token) {
                    alert('Login erfolgreich.');
                    dispatch(setIsLoggedIn(true));
                    dispatch(setShowLoginForm(false));
                }
            }
        } catch (error) {
            console.error(error);
            alert(error?.data?.message);
        }
    };

    return (
        <div className="user-menu-container">
            <form className="user-menu">
                <h2>Account Management</h2>
                <label>Benutzername *</label>
                <input
                    type="text"
                    value={userName}
                    onChange={handleUpdateUserName}
                    style={{ width: '100%' }}
                />
                <label>Passwort *</label>
                <input
                    type="password"
                    value={password}
                    onChange={handleUpdatePassword}
                    style={{ width: '100%' }}
                />
                <div className="login-buttons">
                    {!isLoggingIn ? (
                        <Button
                            type="submit"
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
                    {!isRegistering ? (
                        <Button
                            type="submit"
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
                <Button
                    type="button"
                    onClick={() => dispatch(setShowLoginForm(false))}
                    style={{
                        background: 'linear-gradient(135deg, #ff6b6b 0%, #ff0000 100%)',
                    }}
                >
                    Schließen
                </Button>
            </form>
        </div>
    );
}
