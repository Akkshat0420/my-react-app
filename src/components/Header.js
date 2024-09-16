// src/ProfilePage.js
import React from 'react';
import { Link } from 'react-router-dom';
const ProfilePage = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        {/* Sidebar Section */}
        <div className="col-md-4">
          <div className="card text-center border-0 shadow-sm">
            <div className="card-header bg-danger text-white">
              <img
                src="https://via.placeholder.com/100"
                alt="Profile"
                className="rounded-circle border border-white mt-3"
                style={{ width: '100px', height: '100px' }}
              />
              <h4 className="mt-3">Denys Ruban</h4>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item py-3 text-start">
                <i className="bi bi-person-fill me-2"></i> My Account
              </li>
              <li className="list-group-item py-3 text-start">
        <Link to="/cart" className="text-decoration-none text-dark">
          <i className="bi bi-geo-alt-fill me-2"></i> Cart
        </Link>
      </li>
      <li className="list-group-item py-3 text-start">
        <Link to="/orders" className="text-decoration-none text-dark">
          <i className="bi bi-graph-up me-2"></i> My Orders
        </Link>
      </li>
              <li className="list-group-item py-3 text-start">
                <i className="bi bi-box-arrow-right me-2"></i> Logout
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="col-md-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h2>Welcome to Your Profile</h2>
              <p>This is the main content area where more information can be displayed.</p>
              <button className="btn btn-primary">Edit Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
