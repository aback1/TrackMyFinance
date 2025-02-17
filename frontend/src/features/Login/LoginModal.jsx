import { useEffect, useState } from 'react';
import Button from '../../components/Button.jsx';
import { setShowLoginForm } from './loginSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './LoginForm.jsx';
import LoggedInComponent from './LoggedInComponent.jsx';

export default function LoginModal() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const showLoginForm = useSelector((state) => state.login.showLoginForm);

  const handleShowLoginForm = () => {
    dispatch(setShowLoginForm(true));
  };

  return (
    <div className="modal-container">
      {!showLoginForm && !isLoggedIn ? (
        <Button type="button" className="button" onClick={handleShowLoginForm}>
          Anmelden oder Registrieren
        </Button>
      ) : showLoginForm && !isLoggedIn ? (
        <LoginForm />
      ) : (
        isLoggedIn && <LoggedInComponent />
      )}
    </div>
  );
}
