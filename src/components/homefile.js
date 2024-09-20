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
  <div className="row justify-content-center">
    {/* Card 1: Choose Brand */}
    <div className="col-md-4 d-flex justify-content-center mb-4">
      <div className="card text-center" style={{ width: "12rem" }}>
        <img
          src="Arepa.jpg" // Add your small image here
          alt="Brand"
          className="img-fluid mx-auto mt-3 rounded"
          style={{ width: "50px", height: "50px" }} // Control image size
        />
        <div className="card-body">
          <h5 className="card-title">Repair</h5>
          
          <button className="btn btn-secondary" onClick={handleBrandSelection}>
            Select Brand
          </button>
        </div>
      </div>
    </div>

    {/* Card 2: Other Action */}
    <div className="col-md-4 d-flex justify-content-center mb-4">
      <div className="card text-center" style={{ width: "12rem" }}>
        <img
          src="https://example.com/action-image.jpg" // Add your small image here
          alt="Action"
          className="img-fluid mx-auto mt-3"
          style={{ width: "50px", height: "50px" }} // Control image size
        />
        <div className="card-body">
          <h5 className="card-title">Buy Phone</h5>
         
          <button className="btn btn-secondary" onClick={handleSellAction}>
            Buy Now
          </button>
        </div>
      </div>
    </div>

    {/* Card 3: Sell */}
    <div className="col-md-4 d-flex justify-content-center mb-4">
      <div className="card text-center" style={{ width: "12rem" }}>
        <img
          src="	https://s3no.cashify.in/builder/81c3c74f0683463da548ae2cbe1fec28.webp?p=default&s=lg" // Add your small image here
          alt="Sell"
          className="img-fluid mx-auto mt-3"
          style={{ width: "50px", height: "50px" }} // Control image size
        />
        <div className="card-body">
          <h5 className="card-title">Sell Phone</h5>
          
          <button className="btn btn-secondary" onClick={handleSell}>
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
