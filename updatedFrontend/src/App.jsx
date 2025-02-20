import React from "react";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer.jsx";
import "./index.css"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={
                        <div className="app-container">
                            <Header/>
                            <Dashboard/>
                            <Footer/>
                        </div>
                    }/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;

