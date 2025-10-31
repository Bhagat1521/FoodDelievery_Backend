// import express from "express";
// import { createOrder, getOrders } from "../controllers/orderController.js";

// const router = express.Router();

// // POST → /api/orders
// router.post("/", createOrder);

// // GET → /api/orders
// router.get("/", getOrders);

// export default router;




import express from "express";
import { createOrder, getOrders } from "../controllers/orderController.js";

const router = express.Router();

// POST → /api/orders
router.post("/", async (req, res) => {
  try {
    const order = await createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create order", error: error.message });
  }
});

// GET → /api/orders
router.get("/", async (req, res) => {
  try {
    const orders = await getOrders();
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
});

export default router;
