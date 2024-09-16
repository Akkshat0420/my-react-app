import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from './firebase'; // Ensure Firebase is set up correctly
import { Card, ListGroup, Spinner, Alert, Container } from 'react-bootstrap';


const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const navigate=useNavigate();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const ordersRef = collection(db, 'users', user.uid, 'orders');
          const querySnapshot = await getDocs(ordersRef);
          const ordersData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setOrders(ordersData);
        } else {
            navigate('/login');
          setError('Please log in to view your orders.');

        }
      } catch (err) {
        setError('Failed to fetch orders.');
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading...</p>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2>Your Orders</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {orders.length === 0 ? (
        <div className="text-center mt-5">
          <h4>No orders found</h4>
        </div>
      ) : (
        <ListGroup>
          {orders.map((order) => (
            <ListGroup.Item key={order.id}>
              <div className="d-flex align-items-center">
                <div className="me-auto">
                  <h5>{order.modelName}</h5>
                  <p>Price: ₹{order.price}</p>
                  <p>Storage: {order.storage}</p>
                  <p>Payment ID: {order.paymentId}</p>
                  <p>Date: {order.timestamp?.toDate().toLocaleDateString()}</p>
                </div>
                <Card className="ms-3" style={{ width: '10rem' }}>
                  <Card.Img variant="top" src={order.imageUrl} />
                </Card>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default OrderPage;
