import Order from "../models/Order.js";

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { user, foods, totalAmount } = req.body;
    const order = await Order.create({ user, foods, totalAmount });
    res.status(201).json({ success: true, order });
  } catch (error) {
    if (error.name === 'ValidationError') {
      // This catches errors from your Mongoose schema (e.g., required fields)
      return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: "An internal server error occurred." });
  }
};

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user").populate("foods");
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
