// -------------------- IMPORT DEPENDENCIES --------------------
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// -------------------- IMPORT ROUTES --------------------
import authRoutes from "./routes/authRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import imageRoutes from "./routes/Images.js"; // ✅ Added Image routes

// -------------------- LOAD ENV VARIABLES --------------------
dotenv.config();

// -------------------- CONNECT TO MONGODB --------------------
connectDB();

// -------------------- INITIALIZE EXPRESS APP --------------------
const app = express();

// -------------------- MIDDLEWARE --------------------
app.use(cors()); // allow frontend connection
app.use(express.json()); // parse JSON request body

// -------------------- BASE TEST ROUTE --------------------
app.get("/", (req, res) => {
  res.send("🍔 Food Delivery API is running successfully!");
});
app.get("/ping", (req, res) => {
  res.send("✅ Server is alive on Render!");
});


// -------------------- MAIN API ROUTES --------------------
app.use("/api/auth", authRoutes); // register/login
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/images", imageRoutes); // ✅ Added image route
console.log("✅ Image routes loaded"); // 👈 ADD THIS LINE HERE
// -------------------- ERROR HANDLING --------------------
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// -------------------- START SERVER --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server started on port ${PORT}`));
