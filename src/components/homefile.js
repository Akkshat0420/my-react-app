import React from 'react';
import { useNavigate } from 'react-router-dom';
import About from './BookingForm';
import Issue from './issuefile';

const HomePage = () => {
  const navigate = useNavigate();

  const handleBrandSelection = () => {
    navigate('/brands'); // Navigate to the brand selection page
  };
  const handleSellAction=() =>{
    navigate('/refurbished')
  };
  return (
    <div className="container py-5">
      <div className="row align-items-center">
        {/* Left Side: Technician Image */}
        <div className="col-md-6 text-center">
          <img
            src="https://as1.ftcdn.net/v2/jpg/06/89/56/52/1000_F_689565258_6fEop4uUbfgMDpjQgGLTR5Cpja3y78ml.jpg" // Add your technician image path here
            alt="Technician"
            className="img-fluid"
            style={{ maxWidth: '100%' }}
          />
        </div>

        {/* Right Side: Button */}
        <div className="col-md-6 text-center">
  <button
    className="btn btn-primary btn-lg mr-2"
    onClick={handleBrandSelection}
  >
    Choosing Brand
  </button>
  <button
    className="btn btn-secondary btn-lg ml-2"
    onClick={handleSellAction}
  >
    Other Button
  </button>
</div>
      </div>

      {/* What We Offer Section */}
      <div className="mt-5">
        <h2 className="text-center text-primary mb-4">What We Offer</h2>
        <div className="row text-center">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <i className="bi bi-tools" style={{ fontSize: '2rem', color: '#007bff' }}></i>
                <h5 className="card-title mt-3">Expert Technicians</h5>
                <p className="card-text">Our team of professionals are well-trained in handling various smartphone repairs.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <i className="bi bi-phone" style={{ fontSize: '2rem', color: '#007bff' }}></i>
                <h5 className="card-title mt-3">Quick Repairs</h5>
                <p className="card-text">We ensure fast turnaround times for all your repair needs.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <i className="bi bi-shield-check" style={{ fontSize: '2rem', color: '#007bff' }}></i>
                <h5 className="card-title mt-3">Warranty</h5>
                <p className="card-text">Enjoy peace of mind with our warranty on all repairs.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      
      <Issue/>
      <About />
    </div>
  );
};

export default HomePage;
