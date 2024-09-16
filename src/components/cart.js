// CartPage.js
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db, auth } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Spinner } from 'react-bootstrap'; // Import Spinner for loading state
//import react-ReactBootstrap

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const cartRef = collection(db, 'users', user.uid, 'cart');
          const querySnapshot = await getDocs(cartRef);
          const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setCartItems(items);
        } else {
            navigate('/login');
          console.log('User not logged in');
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  if (loading) {
    return (
      <div className="container text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <div className="alert alert-info" role="alert">
          Your cart is empty. <Link to="/">Browse Products</Link>
        </div>
      ) : (
        <div className="row">
          {cartItems.map(item => (
            <div key={item.id} className="col-md-4 mb-4">
              <div className="card shadow-lg border-primary">
                <img src={item.imageUrl} alt={item.modelName} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{item.modelName}</h5>
                  <p className="card-text">₹{item.price}</p>
                  <Link to={`/refurbished/:category/:brand/${item.id}`} className="btn btn-primary">View Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
