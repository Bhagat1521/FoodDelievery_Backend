// import Order from "../models/Order.js";

// // Create a new order
// export const createOrder = async (req, res) => {
//   try {
//     const { user, foods, totalAmount } = req.body;
//     const order = await Order.create({ user, foods, totalAmount });
//     res.status(201).json({ success: true, order });
//   } catch (error) {
//     if (error.name === 'ValidationError') {
//       // This catches errors from your Mongoose schema (e.g., required fields)
//       return res.status(400).json({ success: false, message: error.message });
//     }
//     res.status(500).json({ success: false, message: "An internal server error occurred." });
//   }
// };

// // Get all orders
// export const getOrders = async (req, res) => {
//   try {
//     const orders = await Order.find().populate("user").populate("foods");
//     res.json({ success: true, orders });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };





import Order from "../models/Order.js";

// -------------------- CREATE A NEW ORDER --------------------
export const createOrder = async (req, res) => {
  try {
    const { user, foods, totalAmount } = req.body;

    // ✅ Validation: ensure required fields exist
    if (!user || !foods || foods.length === 0 || !totalAmount) {
      return res.status(400).json({
        success: false,
        message: "user, foods, and totalAmount are required",
      });
    }

    const order = await Order.create({ user, foods, totalAmount });

    res.status(201).json({
      success: true,
      order,
      message: "Order created successfully",
    });
  } catch (error) {
    console.error("Error creating order:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({ success: false, message: error.message });
    }

    res.status(500).json({
      success: false,
      message: "An internal server error occurred",
    });
  }
};

// -------------------- GET ALL ORDERS --------------------
export const getOrders = async (req, res) => {
  try {
    // ✅ Populate user and foods references
    const orders = await Order.find().populate("user").populate("foods");

    if (!orders || orders.length === 0) {
      return res.status(200).json({
        success: true,
        orders: [],
        message: "No orders found",
      });
    }

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
