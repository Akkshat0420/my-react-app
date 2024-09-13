import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase'; // Import your Firebase config

const RefurbishedModels = () => {
  const { category, brand } = useParams();
  const [models, setModels] = useState([]);

  useEffect(() => {
    const fetchRefurbishedModels = async () => {
      try {
        const q = query(
          collection(db, 'refurbishedItems'),
          where('category', '==', category),
          where('brand', '==', brand)
        );
        const snapshot = await getDocs(q);
        const modelsData = snapshot.docs.map(doc => ({
          id: doc.id,
          modelName: doc.data().modelName,
          imageUrl: doc.data().imageUrl,
          price: doc.data().price,
          priceOff: doc.data().priceOff,
          reviews: doc.data().reviews,
          storage: doc.data().storage
        }));
        setModels(modelsData);
      } catch (error) {
        console.error('Error fetching refurbished models:', error);
      }
    };

    fetchRefurbishedModels();
  }, [category, brand]);

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">{brand} {category} Models</h2>
      <div className="row">
        {models.length > 0 ? (
          models.map((model) => (
            <div className="col-md-4 col-lg-3 mb-4" key={model.id}>
              <div className="card h-100 shadow-sm">
                <div className="position-relative">
                  {/* Discount badge */}
                  <span className="position-absolute top-0 start-0 badge bg-warning text-dark">
                    ₹{model.priceOff} OFF
                  </span>
                  {/* Model Image */}
                  <img 
                    src={model.imageUrl} 
                    className="card-img-top img-fluid" 
                    alt={model.modelName}
                    style={{ objectFit: 'cover', height: '200px' }}
                  />
                </div>
                <div className="card-body d-flex flex-column">
                  {/* Model Name */}
                  <h5 className="card-title text-center">{model.modelName}</h5>
                  {/* Reviews */}
                  <div className="text-center text-warning">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                    <span className="text-muted"> ({model.reviews})</span>
                  </div>
                  {/* Sale Badge */}
                  <p className="text-center my-2">
                    <span className="badge bg-primary">Apple Bumper Sale</span>
                  </p>
                  {/* Price and Discount */}
                  <div className="text-center mb-2">
                    <p className="text-danger fw-bold mb-0">
                      -50% ₹{model.priceOff}
                    </p>
                    <p className="text-muted text-decoration-line-through">
                      ₹{model.price}
                    </p>
                    <p className="text-success">Effective Price: ₹{model.priceOff}</p>
                  </div>
                </div>
                {/* Card Footer with Button */}
                <div className="card-footer text-center bg-white">
                  <Link to={`/refurbished/${category}/${brand}/${model.id}`} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No models found for {brand} in the {category} category.</p>
        )}
      </div>
    </div>
  );
};

export default RefurbishedModels;
