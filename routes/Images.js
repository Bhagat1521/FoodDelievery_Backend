// routes/image.js
//Image Upload API (Admin POST)
import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/Cloudinary.js";
import Image from "../models/Image.js";

const router = express.Router();
console.log("✅ Cloudinary Image API active"); // 👈 ADD THIS HERE
// Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => ({
    folder: req.body.category, // folder dynamically based on category
    allowed_formats: ["jpg", "jpeg", "png"],
  }),
});

const parser = multer({ storage });

// POST /api/images/upload
router.post("/upload", parser.single("image"), async (req, res) => {
  try {
    const { title, category } = req.body;
    if (!title || !category || !req.file) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newImage = await Image.create({
      title,
      category,
      url: req.file.path,
    });

    res.json({ success: true, image: newImage });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/images/:category
router.get("/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const images = await Image.find({ category });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
