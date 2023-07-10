import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './components/DashboardPage';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import AdminPage from './components/AdminPage';
import DoctorPage from './components/DoctorPage';
import PatientPage from './components/PatientPage';
import NotFound from './components/NotFound'; 
import NavigationBar from './components/NavigationBar';
import WelcomePage from './components/WelcomePage';
import AboutUsPage from './components/AboutUsPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  useEffect(() => {
    const tokenExpirationTime = 10 * 60 * 1000; // 5 minutes in milliseconds

    // Check if token exists in local storage
    const token = localStorage.getItem('token');
    if (token) {
      // Token exists, check if it's expired
      const expirationTime = localStorage.getItem('expirationTime');
      const currentTime = new Date().getTime();

      if (currentTime - expirationTime > tokenExpirationTime) {
        // Token expired, remove from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        setIsLoggedIn(false);
      } else {
        // Token still valid, set isLoggedIn to true
        setIsLoggedIn(true);
        // Schedule removal of token after 5 minutes
        setTimeout(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('expirationTime');
          setIsLoggedIn(false);
        }, tokenExpirationTime);
      }
    }
  }, []);

  const handleLogin = () => {
    // Perform login logic
    setIsLoggedIn(true);
    // Set token and expiration time in local storage
    localStorage.setItem('token', 'your_token_here');
    localStorage.setItem('expirationTime', new Date().getTime());
  };

  const handleLogout = () => {
    // Perform logout logic
    setIsLoggedIn(false);
    // Remove token and expiration time from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    
  };

  return (
    <Router>
      <NavigationBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>

        <Route path="/" element={<DashboardPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm handleLogin={handleLogin} />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/doctor" element={<DoctorPage />} />
        <Route path="/patient" element={<PatientPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </Router>
  );
};

export default App;
