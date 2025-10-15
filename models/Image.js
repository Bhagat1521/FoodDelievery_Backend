// models/Image.js 
// model to store images.
import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true }, // e.g., "MainDish", "BestSeller", "Offers"
  url: { type: String, required: true }, // Cloudinary URL
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Image", imageSchema);
