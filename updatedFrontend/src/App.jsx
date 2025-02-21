import React from "react";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer.jsx";
import "./index.css"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import ContactInformation from "./components/ContactInformation.jsx";
import DataProtectionDeclaration from "./components/DataProtectionDeclaration.jsx";
import TransactionList from "./components/TransactionList.jsx";
import ContactInfoForm from "./components/ContactInfoForm.jsx";

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
                    <Route path="/impressum" element={
                        <div className="app-container">
                            <Header/>
                            <ContactInformation />
                            <Footer/>
                        </div>
                    }/>
                    <Route path="/datenschutzerklärung" element={
                        <div className="app-container">
                            <Header/>
                            <DataProtectionDeclaration />
                            <Footer/>
                        </div>
                    }/><Route path="/transactions" element={
                        <div className="app-container">
                            <Header/>
                            <TransactionList />
                            <Footer/>
                        </div>
                    }/>
                    <Route path="/account" element={
                        <div className="app-container">
                            <Header/>
                            <ContactInfoForm />
                            <Footer/>
                        </div>
                    }/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;

