import React from 'react';
import { useNavigate } from 'react-router-dom'; // To handle navigation
import WarrantyClaimProcess from './warranty';
import FAQ from './whyus';
import Top from './topview';
import DownloadAppSection from '../components/dowlodapp';

const AllBrands = () => {
  const history = useNavigate();

  // Dummy data for smartphone and laptop brands
  const smartphoneBrands = [
    { name: 'Apple', imageUrl: 'https://api.ovantica.com/prisma/ovanticainventory/images/Apple.jpg' },
    { name: 'Samsung', imageUrl: 'https://api.ovantica.com/prisma/ovanticainventory/images/Samsung.jpg' },
    { name: 'OnePlus', imageUrl: 'https://cdn-icons-png.flaticon.com/128/882/882743.png' },
    { name: 'Xiaomi', imageUrl: 'https://w7.pngwing.com/pngs/122/182/png-transparent-xiaomi-logo-xiaomi-mi-a1-smartphone-internet-business-smartphone-angle-electronics-text.png' },
    { name: 'Google', imageUrl: 'https://cdn-icons-png.flaticon.com/128/300/300221.png' },
  ];
  
  const laptopBrands = [
    { name: 'Apple', imageUrl: 'https://cdn-icons-png.flaticon.com/128/0/747.png' },
    { name: 'Dell', imageUrl: 'https://cdn-icons-png.flaticon.com/128/882/882726.png' },
    { name: 'HP', imageUrl: 'https://cdn-icons-png.flaticon.com/128/16183/16183582.png' },
    { name: 'Lenovo', imageUrl: 'https://cdn-icons-png.flaticon.com/128/882/882717.png' },
    { name: 'Asus', imageUrl: 'https://cdn-icons-png.flaticon.com/128/882/882744.png' },
  ];
  
  // Handle navigation to the refurbished models page
  const handleBrandClick = (category, brand) => {
    history(`/models/${category}/${brand}`);
  };
  
 
    return (
      <div>
        <Top/>
        <div className="container my-5">
          {/* Smartphone Brands Section */}
          <h3 className="mb-4 text-primary">Smartphone Brands</h3>
          <div className="row">
            {smartphoneBrands.map((brand) => (
              <div className="col-6 col-md-2 mb-4" key={brand.name}>
                <div
                  className="card h-100 shadow-sm"
                  onClick={() => handleBrandClick('Smartphone', brand.name)}
                  style={{ cursor: 'pointer' ,borderRadius: '10px',
                    width:'100px',
                    height: '95px', // Reduced card height
                    padding: '5px'}}
                >
                  <img
                    src={brand.imageUrl}
                    className="card-img-top"
                    alt={brand.name}
                    style={{height: '75px',width:'75px',  objectFit: 'cover',padding:'10px' }}
                  />
                  
                </div>
              </div>
            ))}
          </div>
  
          {/* Laptop Brands Section */}
          <h3 className="mt-5 mb-4 text-primary">Laptop Brands</h3>
          <div className="row">
            {laptopBrands.map((brand) => (
              <div className="col-4 col-md-2 mb-4" key={brand.name}>
                <div
                  className="card  shadow-sm"
                  onClick={() => handleBrandClick('laptop', brand.name)}
                  style={{ cursor: 'pointer',
                    borderRadius: '10px',
                    width:'100px',
                    height: '95px', // Reduced card height
                    padding: '5px' }}
                >
                  <img
                    src={brand.imageUrl}
                    className="card-img-top"
                    alt={brand.name}
                    style={{ height: '75px',width:'75px' , objectFit: 'cover',padding:'10px' }}
                  />
                  
                </div>
              </div>
            ))}
          </div>
      <img src="	https://ovantica.com/assets/images/quality.jpg" alt="" />
    </div>
    <WarrantyClaimProcess/>
      <DownloadAppSection/>
      <FAQ/>
      <img src="https://ovantica.com/assets/images/env-banner.jpeg
" alt="" />
    </div>
  );
};
export default AllBrands;