// src/components/Header.js

import React from 'react';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
//import Navbar from './navfile';
import { Carousel } from 'react-bootstrap';
import './Slider.css';
import FixYantraNavbar from './navfile';
const Header = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <header>
      <FixYantraNavbar />
      <div className="container mt-5 slider-container">
      <Carousel>
        {/* First Slide */}
        <Carousel.Item>
          <img
            className="d-block w-100 rounded"
            src="download.png"
            alt="First slide"
          />
          
        </Carousel.Item>

        {/* Second Slide */}
        <Carousel.Item>
          <img
            className="d-block w-100 rounded"
            src="Picsart-6.jpg"
            alt="Second slide"
          />
          
        </Carousel.Item>

        {/* Third Slide */}
        <Carousel.Item>
          <img
            className="d-block w-100 rounded"
            src="Picsart-7.jpg"
            alt="Third slide"
          />
         
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 rounded"
            src="Picsart-8.jpg"
            alt="Third slide"
          />
         
        </Carousel.Item>
      </Carousel>
    </div>
    </header>
  );
};

export default Header;
