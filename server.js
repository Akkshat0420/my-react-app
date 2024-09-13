const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
require('dotenv').config(); // For environment variables

const app = express();
app.use(cors()); // Allow cross-origin requests from your React frontend
app.use(express.json());

// Razorpay instance (using environment variables for keys)
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_y4DOSc8PHqcLlC', // Replace with your actual Razorpay key ID
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'FtVkEKKqTK1IXfmGpdxDlv7G' // Replace with your actual Razorpay key secret
});

// Create Order route
app.post('/create-order', async (req, res) => {
  const { amount } = req.body; // Get the amount from the frontend

  try {
    const options = {
      amount: amount * 100, // Convert to paise (smallest currency unit)
      currency: 'INR',
      receipt: 'receipt#1', // You can customize the receipt format
    };
    
    // Create the order
    const order = await razorpayInstance.orders.create(options);
    
    // Send back the order information to the frontend
    res.status(200).json(order);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).send('Error creating order');
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
