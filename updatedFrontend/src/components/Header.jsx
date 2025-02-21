import React from "react";
import "../styles/Header.css";
import { FaBell, FaCog } from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import Button from "./Button.jsx";

export default function Header() {

    const navigate = useNavigate();

    return (
        <header className="header">
            <div className="header-left">
                <div className="logo">TrackMyFinance</div>
                <nav>
                    <ul className="nav-list">
                        <li onClick={() => navigate("/")}><a>Overview</a></li>
                        <li onClick={() => navigate("/transactions")}><a>Transactions</a></li>
                        <li onClick={() => navigate("/account")}><a>Account</a></li>
                    </ul>
                </nav>
            </div>
            <div className="header-right">
                <button className="icon-button">
                    <FaCog />
                </button>
                <button className="icon-button">
                    <FaBell />
                </button>
                <div className="user-icon">J</div>
            </div>
        </header>
    );
}
