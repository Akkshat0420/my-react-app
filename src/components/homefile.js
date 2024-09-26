import React from 'react';
import { useNavigate } from 'react-router-dom';
import About from './BookingForm';
import Issue from './issuefile';
import DownloadAppSection from './dowlodapp';
//import { Carousel } from 'react-bootstrap';
const HomePage = () => {
  const navigate = useNavigate();

  const handleBrandSelection = () => {
    navigate('/brands'); // Navigate to the brand selection page
  };
  const handleSellAction=() =>{
    navigate('/refurbished')
  };
  const handleSell=() =>{
    navigate('/sell')
  };
  return (
    <div>
  <div className="container py-5">
  

        {/* Card 3: Sell Phone */}
        <h3 className="text-center mb-4">Choose an Action</h3>
      
      <div className="row ">
        {/* Card 1: Repair */}
        <div className="col-6 col-sm-4 col-md-3 col-lg-2 d-flex justify-content-center mb-3">
          <div className="card text-center shadow" style={{ width: "10rem", border: "none" }}>
            <img
              src="Arepa.jpg"
              alt="Repair"
              className="img-fluid mx-auto mt-3 rounded"
              style={{ width: "45px", height: "45px" }} // Control image size
            />
            <div className="card-body p-2">
              <h5 className="card-title" style={{ fontSize: "1rem", color: "#343a40" }}>Repair</h5>
              <button className="btn btn-outline-secondary btn-sm" onClick={handleBrandSelection}>
                Select Brand
              </button>
            </div>
          </div>
        </div>

        {/* Card 2: Buy Phone */}
        <div className="col-6 col-sm-4 col-md-3 col-lg-2 d-flex justify-content-center mb-3">
          <div className="card text-center shadow" style={{ width: "10rem", border: "none" }}>
            <img
              src="https://example.com/action-image.jpg"
              alt="Buy"
              className="img-fluid mx-auto mt-3 rounded"
              style={{ width: "45px", height: "45px" }}
            />
            <div className="card-body p-2">
              <h5 className="card-title" style={{ fontSize: "1rem", color: "#343a40" }}>Buy Phone</h5>
              <button className="btn btn-outline-secondary btn-sm" onClick={handleSellAction}>
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Card 3: Sell Phone */}
        <div className="col-6 col-sm-4 col-md-3 col-lg-2 d-flex justify-content-center mb-3">
          <div className="card text-center shadow" style={{ width: "10rem", border: "none" }}>
            <img
              src="https://s3no.cashify.in/builder/81c3c74f0683463da548ae2cbe1fec28.webp?p=default&s=lg"
              alt="Sell"
              className="img-fluid mx-auto mt-3 rounded"
              style={{ width: "45px", height: "45px" }}
            />
            <div className="card-body p-2">
              <h5 className="card-title" style={{ fontSize: "1rem", color: "#343a40" }}>Sell Phone</h5>
              <button className="btn btn-outline-secondary btn-sm" onClick={handleSell}>
                Sell Now
              </button>
            </div>
          </div>
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
      
      <div className="container">
      <div className="row">
        <div className="col-12 col-md-6">
          <img src="Picsart-3.jpg" alt="Responsive Image" className="img-fluid" />
        </div>
      </div>
      </div>
      <Issue/>
      <DownloadAppSection/>
      <About />
    </div>
    </div>
  );
};

export default HomePage;
