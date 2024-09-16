import React, { useState, useEffect } from 'react';
import { auth, signOut } from './firebase'; // Firebase auth and sign-out
import { onAuthStateChanged } from 'firebase/auth'; // Listen to auth changes
//import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // Update authentication status
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      setIsAuthenticated(false); // Update state
      window.location.href = '/login'; // Redirect to login after logout
    } catch (error) {
      console.error('Error during sign-out:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="/">FixYantra</a>
        
        
        <ul className="navbar-nav ms-auto">
  <li className="nav-item me-3">
    <a className="nav-link fw-bold custom-nav-link" href="/">Home</a>
  </li>
  {isAuthenticated ? (
    <>
      <li className="nav-item me-3">
        <a className="nav-link fw-bold custom-nav-link" href="/repair">Repair</a>
      </li>
      <li className="nav-item me-3">
        <button className="nav-link btn btn-link fw-bold custom-nav-link" onClick={handleLogout}>Logout</button>
      </li>
    </>
  ) : (
    <li className="nav-item me-3">
      <a className="nav-link fw-bold custom-nav-link" href="/login">Login</a>
    </li>
  )}
  <li className="nav-item me-3">
    <a className="nav-link fw-bold custom-nav-link" href="/profile">Profile</a>
  </li>
  <li className="nav-item me-3">
    <a className="nav-link fw-bold custom-nav-link" href="/contact">Contact</a>
  </li>
</ul>


      </div>
    </nav>
  );
};

export default Navbar;
