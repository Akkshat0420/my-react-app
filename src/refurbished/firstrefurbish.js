import React from 'react';
import { useNavigate } from 'react-router-dom'; // To handle navigation

const AllBrands = () => {
  const history = useNavigate();

  // Dummy data for smartphone and laptop brands
  const smartphoneBrands = [
    { name: 'Apple', imageUrl: 'https://example.com/apple.jpg' },
    { name: 'Samsung', imageUrl: 'https://example.com/samsung.jpg' },
    { name: 'OnePlus', imageUrl: 'https://example.com/oneplus.jpg' },
    { name: 'Xiaomi', imageUrl: 'https://example.com/xiaomi.jpg' },
    { name: 'Google', imageUrl: 'https://example.com/google.jpg' },
  ];

  const laptopBrands = [
    { name: 'Apple', imageUrl: 'https://example.com/apple-laptop.jpg' },
    { name: 'Dell', imageUrl: 'https://example.com/dell.jpg' },
    { name: 'HP', imageUrl: 'https://example.com/hp.jpg' },
    { name: 'Lenovo', imageUrl: 'https://example.com/lenovo.jpg' },
    { name: 'Asus', imageUrl: 'https://example.com/asus.jpg' },
  ];

  // Handle navigation to the refurbished models page
  const handleBrandClick = (category, brand) => {
    history(`/models/${category}/${brand}`);
  };

  return (
    <div className="container my-5">
      {/* Smartphone Brands Section */}
      <h2 className="mb-4">Smartphone Brands</h2>
      <div className="row">
        {smartphoneBrands.map((brand) => (
          <div className="col-md-3 mb-4" key={brand.name}>
            <div className="card h-100" onClick={() => handleBrandClick('Smartphone', brand.name)} style={{ cursor: 'pointer' }}>
              <img src={brand.imageUrl} className="card-img-top" alt={brand.name} />
              <div className="card-body">
                <h5 className="card-title">{brand.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Laptop Brands Section */}
      <h2 className="mt-5 mb-4">Laptop Brands</h2>
      <div className="row">
        {laptopBrands.map((brand) => (
          <div className="col-md-3 mb-4" key={brand.name}>
            <div className="card h-100" onClick={() => handleBrandClick('laptop', brand.name)} style={{ cursor: 'pointer' }}>
              <img src={brand.imageUrl} className="card-img-top" alt={brand.name} />
              <div className="card-body">
                <h5 className="card-title">{brand.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AllBrands;