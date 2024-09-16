import React from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula nisl nec felis fermentum, et ultricies nisl egestas.</p>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white">Home</a></li>
              <li><a href="/" className="text-white">Features</a></li>
              <li><a href="/" className="text-white">Pricing</a></li>
              <li><a href="/" className="text-white">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li><a href="mailto:info@example.com" className="text-white">info@example.com</a></li>
              <li><a href="tel:+1234567890" className="text-white">+123 456 7890</a></li>
              <li><address>123 Example Street, City, Country</address></li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-4">
          <p className="mb-0">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
