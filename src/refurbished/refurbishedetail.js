import React, { useState, useEffect } from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import { doc, getDoc,collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db,auth } from './firebase'; // Assuming Firebase is set up correctly
import axios from 'axios';
const ModelDetailPage = () => {
  const { modelId } = useParams();
  const [model, setModel] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const navigate=useNavigate();
  useEffect(() => {
    const fetchModelDetails = async () => {
      try {
        const docRef = doc(db, 'refurbishedItems', modelId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setModel(docSnap.data());
          // Set default storage option
          if (docSnap.data().storageOptions?.length > 0) {
            setSelectedStorage(docSnap.data().storageOptions[0]);
          }
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching model details:', error);
      }
    };

    fetchModelDetails();
  }, [modelId]);

  if (!model) {
    return <div>Loading...</div>;
  }

  const handleStorageChange = (storageOption) => {
    setSelectedStorage(storageOption);
  };
  const handleAddToCart = async (model) => {
    try {
      const user = auth.currentUser;
      if (user) {
        // Create a reference to the user's cart collection
        const cartRef = collection(db, 'users', user.uid, 'cart');
        await addDoc(cartRef, {
          modelName: model.modelName,
          price: model.price,
          priceOff: model.priceOff,
          storage: model.storageOptions, // Include selected storage option
          imageUrl: model.imageUrl,
          timestamp: serverTimestamp(), // Timestamp for when the item was added
        });
        alert('Added to cart successfully!');
      } else {
        navigate('/login');
        alert('Please log in to add items to your cart.');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };
  
 
  
 

  const handleBuyNow = async (model) => {
    try {
      const amountInPaise = model.price * 100;
  
      const response = await axios.post('http://localhost:5000/create-order', {
        amount: amountInPaise,
      });
  
      const orderData = response.data;
  
      const options = {
        key: 'rzp_test_y4DOSc8PHqcLlC',
        amount: orderData.amount,
        currency: 'INR',
        name: 'Your Company Name',
        description: 'Purchase Description',
        order_id: orderData.id,
        handler: function (response) {
          alert(`Payment Successful. Payment ID: ${response.razorpay_payment_id}`);
          saveOrderToFirestore(model, response);
        },
        prefill: {
          name: 'Your Name',
          email: 'email@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
      };
  
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Error creating Razorpay order', error);
    }
  };
  
  const saveOrderToFirestore = async (model, paymentResponse) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const ordersRef = collection(db, 'users', user.uid, 'orders');
        await addDoc(ordersRef, {
          modelName: model.modelName,
          price: model.price,
          storage: selectedStorage?.storage || model.storageOptions[0].storage,
          paymentId: paymentResponse.razorpay_payment_id,
          timestamp: serverTimestamp(),
        });
        alert('Order saved successfully!');
      } else {
        alert('Please log in to place the order.');
      }
    } catch (error) {
      console.error('Error saving order to Firestore:', error);
    }
  };
  


  
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6">
          <img src={model.imageUrl} alt={model.modelName} className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h2>{model.modelName} - {model.category}</h2>
          <p className="text-muted">{model.reviews} reviews</p>
          <h4 className="text-success">
            ₹{selectedStorage?.price || model.price}
            {model.priceOff && (
              <span className="text-danger ms-3">₹{model.priceOff} Off</span>
            )}
          </h4>

          {/* Storage options */}
          {model.storageOptions && (
            <div className="mt-4">
              <h6>Choose Storage:</h6>
              <div className="d-flex">
                {model.storageOptions.map((option, index) => (
                  <button
                    key={index}
                    className={`btn btn-outline-primary me-2 ${selectedStorage?.storage === option.storage ? 'active' : ''}`}
                    onClick={() => handleStorageChange(option)}
                  >
                    {option.storage}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4">
          <button
    className="btn btn-primary me-3"
    onClick={() => handleAddToCart(model)}
  >
    Add to Cart
  </button>
  <button
    className="btn btn-success"
    onClick={() => handleBuyNow(model)}
  >
    Buy Now
  </button>
          </div>
        </div>
      </div>

      {/* Extra details if needed */}
      <div className="row mt-5">
        <div className="col">
          <h5>Product Details</h5>
          {/* Additional product information */}
          <div className="card-body">
              {/* Quality Check, Refund, Warranty Info */}
              <p className="card-text">
                <span className="badge bg-success me-2">32 Point Quality Check</span>
                <span className="badge bg-info me-2">15 Days Return</span>
                <span className="badge bg-warning">6 Months Warranty</span>
              </p>
            </div>
            
        </div>
        <div className="container my-4">
  <h5>Buy for <span className="text-success">₹{model.price - 500}</span></h5>
  <div className="row">
    {/* UPI Offer */}
    <div className="col-md-6 mb-3">
      <div className="card border-0 shadow-lg p-3 bg-warning bg-opacity-25">
        <div className="card-body">
          <h6 className="card-title text-warning">UPI Offer</h6>
          <p className="card-text mb-1">Price: <span>₹31,099</span></p>
          <p className="card-text mb-1">Discount: <span className="text-danger">-₹10,400</span></p>
          <p className="card-text mb-1">Apple Bumper Sale: <span className="text-danger">-₹5,300</span></p>
          <p className="card-text mb-1">3% Instant discount of ₹462: <span className="text-danger">-₹462</span></p>
          <hr />
          <h6 className="card-text fw-bold">Best Price: ₹14,937</h6>
        </div>
      </div>
    </div>

    {/* Credit/Debit Card Offer */}
    <div className="col-md-6 mb-3">
      <div className="card border-0 shadow-lg p-3 bg-info bg-opacity-25">
        <div className="card-body">
          <h6 className="card-title text-info">Credit/Debit Card Offer</h6>
          <p className="card-text mb-1">Price: <span>₹31,099</span></p>
          <p className="card-text mb-1">Discount: <span className="text-danger">-₹10,400</span></p>
          <p className="card-text mb-1">Apple Bumper Sale: <span className="text-danger">-₹5,300</span></p>
          <p className="card-text mb-1">2% Instant discount of ₹308: <span className="text-danger">-₹308</span></p>
          <hr />
          <h6 className="card-text fw-bold">Best Price: ₹15,091</h6>
        </div>
      </div>
    </div>
  </div>
</div>
  
        
      </div>
    </div>
  );
};

export default ModelDetailPage;
