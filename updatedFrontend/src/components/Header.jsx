import React, { useState } from "react";
import "../styles/Header.css";
import { FaBell, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrency } from "../features/transaction/transactionSlice";
import Notifications from "./Notifications.jsx";
import LoginForm from "./LoginForm.jsx";
import SmallSpinner from "./SmallSpinner.jsx";
import { useLoginUserMutation, useRegisterUserMutation } from "../features/login/loginApi";
import { setUserName, setIsLoggedIn, logout } from "../features/login/loginSlice";

export default function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currency = useSelector((state) => state.transaction.currency);
    const userName = useSelector((state) => state.login.userName) || "";
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn) || false;

    //to be displayed in the login icon
    const firstLetter = userName.slice(0,1);

    const [showNotifications, setShowNotifications] = useState(false);
    const [showCurrency, setShowCurrency] = useState(false);
    const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const toggleNotifications = () => {
        setShowNotifications((prev) => !prev);
    };

    const toggleCurrency = () => {
        setShowCurrency((prev) => !prev);
        if (showCurrency) {
            setShowCurrencyDropdown(false);
        }
    };

    const handleCurrencySelect = (curr) => {
        dispatch(setCurrency(curr));
        setShowCurrencyDropdown(false);
        setShowCurrency(false);
    };

    const handleUserMenuToggle = () => {
        setShowUserMenu((prev) => !prev);
    };

    return (
        <>
            <header className="header">
                <div className="header-left">
                    <div onClick={() => navigate("/")} className="logo">
                        TrackMyFinance
                    </div>
                    <nav>
                        <ul className="nav-list">
                            <li onClick={() => navigate("/")}>
                                <a>Overview</a>
                            </li>
                            <li onClick={() => navigate("/transactions")}>
                                <a>Transactions</a>
                            </li>
                            <li onClick={() => navigate("/account")}>
                                <a>Account</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="header-right">
                    <button className="icon-button" onClick={toggleCurrency}>
                        <FaCog />
                    </button>
                    {showCurrency && (
                        <div className="currency-tab">
                            <div
                                className="currency-header"
                                onClick={() => setShowCurrencyDropdown((prev) => !prev)}
                            >
                                {currency}{" "}
                                <span className="arrow">
                  {showCurrencyDropdown ? "▲" : "▼"}
                </span>
                            </div>
                            {showCurrencyDropdown && (
                                <ul className="currency-dropdown">
                                    <li onClick={() => handleCurrencySelect("USD")}>USD</li>
                                    <li onClick={() => handleCurrencySelect("EUR")}>EUR</li>
                                </ul>
                            )}
                        </div>
                    )}
                    <button className="icon-button" onClick={toggleNotifications}>
                        <FaBell />
                    </button>
                    {showNotifications && (
                        <div className="notification-tab">
                            <Notifications />
                        </div>
                    )}
                    <div className="user-icon" onClick={handleUserMenuToggle}>
                        {firstLetter}
                    </div>
                </div>
            </header>
            {showUserMenu && (
                <div className="user-menu-container">
                    <UserMenu />
                </div>
            )}
        </>
    );
}

function UserMenu() {
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.login);
    const [showUserMenu, setShowUserMenu] = useState(true);

    // Local state for login/register form inputs
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    // RTK Query mutation hooks
    const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();
    const [registerUser, { isLoading: registerLoading }] = useRegisterUserMutation();

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const newCredentials = {
            name: usernameInput,
            password: passwordInput
        };
        let response;
        try {
            response = await loginUser(newCredentials).unwrap();

            //the lexik jwt sends a token if the login was successful.
            if(response.token) {
             alert("Login erfolgreich");
             dispatch(setUserName(usernameInput));
             dispatch(setIsLoggedIn(true));
             setShowUserMenu(false);
            }
        } catch (error) {
            console.error("Login error:", error);
            setShowUserMenu(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        let response;
        try {
           response = await registerUser({ username: usernameInput, password: passwordInput }).unwrap();
            if (response.status === "User created successfully") {
                alert("User created successfully you are now logged in.");
                dispatch(setUserName(usernameInput));
                dispatch(setIsLoggedIn(true));
                setShowUserMenu(false);
            }

        } catch (error) {
            console.error("Registration error:", error);
        }
    };

    return (
        <>
        {showUserMenu &&
        <div className="user-menu">
            {isLoggedIn ? (
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            ) : (
                <form className="login-form">
                    <input
                        type="text"
                        placeholder="Username"
                        value={usernameInput}
                        onChange={(e) => setUsernameInput(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                    />
                    <div className="login-buttons">
                        {!loginLoading ? (
                            <button onClick={handleLogin} disabled={loginLoading}>
                                Login
                            </button>

                        ) : (
                            <SmallSpinner />
                        )
                        }
                        {!registerLoading ? (
                            <button onClick={handleRegister} disabled={registerLoading}>
                                Register
                            </button>
                        ) : (
                            <SmallSpinner />
                        )}
                    </div>
                </form>
            )}
        </div>
        }
        </>
    );
}
