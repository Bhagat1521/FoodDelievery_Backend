// -------------------- IMPORT DEPENDENCIES --------------------
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Import Routes
import authRoutes from "./routes/authRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

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

// -------------------- MAIN API ROUTES --------------------
app.use("/api/auth", authRoutes); // for register/login
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/orders", orderRoutes);

// -------------------- ERROR HANDLING --------------------
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// -------------------- START SERVER --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server started on port ${PORT}`));
