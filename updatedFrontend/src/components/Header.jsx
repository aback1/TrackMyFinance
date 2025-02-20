import React from "react";
import "../styles/Header.css";
import { FaBell, FaCog } from "react-icons/fa";

export default function Header() {
    return (
        <header className="header">
            <div className="header-left">
                <div className="logo">TrackMyFinance</div>
                <nav>
                    <ul className="nav-list">
                        <li><a href="#overview">Overview</a></li>
                        <li><a href="#transactions">Transactions</a></li>
                        <li><a href="#accounts">Accounts</a></li>
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
