import Food from "../models/Food.js";

// Get all foods
export const getFoods = async (req, res) => {
  try {
    const foods = await Food.find().populate("restaurant");
    res.json({ success: true, foods });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
