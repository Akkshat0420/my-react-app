
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css';
import { auth } from './firebase'; 
import RepairRequest from './Services';
//import Login from './login';// Import your custom CSS file for additional styling

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  

  useEffect(() => {
    // Mock authentication check; replace with actual logic
    const checkAuthentication = () => {
      const user = auth.currentUser; // Replace with actual authentication logic
      setIsAuthenticated(!user);
    };

    checkAuthentication();
  }, []);

  const handleLogout = () => {
    // Mock logout logic; replace with actual logout logic
    auth.signOut().then(() => {
      setIsAuthenticated(false);
     
    });
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
      <div className="container">
        <a className="navbar-brand" href="#">BrandName</a>
       
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
              {
              isAuthenticated ? (
                <>
                  <Link className="nav-link" to="/repair">Your Repair</Link>
                  <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <Link className="nav-link" to="/login">Login</Link>
              )}
            </li>
            
            <li className="nav-item">
              <a className="nav-link" href="#">Pricing</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contact</a>
            </li>
          </ul>
        </div>
        <div className="nav__menu ms-auto">
        <a className="nav__link" href="#">Home</a>
        
        <a className="nav__link" href="/login">Login</a>
        <a className="nav__link" href="#">Pricing</a>
        <a className="nav__link" href="#">Contact</a>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
