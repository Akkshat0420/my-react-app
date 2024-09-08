// src/components/Header.js

import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Navbar from './navfile';

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
      <Navbar />
      <Slider {...settings} style={{padding : 20}}>
        <div>
          <img
            src="https://s3n.cashify.in/cashify/web/f7ec0b702ec04d43a483041e7343f05f.webp"
            alt="Slider 1"
            className="w-full h-72 object-cover rounded"
          />
        </div>
        <div>
          <img
            src="https://s3n.cashify.in/cashify/web/813e0006ef304d72b82ea0a59f5b3f84.webp"
            alt="Slider 2"
            className="w-full h-72 object-cover rounded"
          />
        </div>
        <div>
          <img
            src="https://s3n.cashify.in/cashify/web/813e0006ef304d72b82ea0a59f5b3f84.webp"
            alt="Slider 3"
            className="w-full h-72 object-cover rounded"
          />
        </div>
      </Slider>
    </header>
  );
};

export default Header;
