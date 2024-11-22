// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AuthPage from './Login/AuthPage';
import RegisterPage from './Login/RegisterPage';
import MonthlyBill from './MonthlyBill/MonthlyBill';



const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AuthPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/monthly-bill" element={<MonthlyBill />} />
            </Routes>
        </Router>
    );
};

export default App;
