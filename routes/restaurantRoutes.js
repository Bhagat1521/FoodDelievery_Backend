import express from "express";
import Restaurant from "../models/Restaurant.js";

const router = express.Router();

// ✅ POST: Add new restaurant
router.post("/", async (req, res) => {
  try {
    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.status(201).json({ success: true, restaurant });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// ✅ GET: Fetch all restaurants
router.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json({ success: true, restaurants });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
