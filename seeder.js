// -------------------- IMPORTS --------------------
import mongoose from "mongoose";
import dotenv from "dotenv";

// Import models
import Restaurant from "./models/Restaurant.js";
import Food from "./models/Food.js";

dotenv.config();

// -------------------- CONNECT TO MONGODB --------------------
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected for seeding");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

// -------------------- SAMPLE DATA --------------------
const restaurants = [
  { name: "Pizza Place", address: "123 Main St", image: "pizza.jpg" },
  { name: "Burger Joint", address: "456 Market St", image: "burger.jpg" },
  { name: "Pasta Corner", address: "789 Elm St", image: "pasta.jpg" },
];

const foods = [
  { name: "Pepperoni Pizza", price: 299 },
  { name: "Cheese Pizza", price: 249 },
  { name: "Cheese Burger", price: 199 },
  { name: "Veggie Burger", price: 179 },
  { name: "Pasta Alfredo", price: 259 },
];

// -------------------- SEED FUNCTION --------------------
const seedDatabase = async () => {
  try {
    await connectDB();

    // 1️⃣ Clear old data
    await Restaurant.deleteMany();
    await Food.deleteMany();

    // 2️⃣ Insert restaurants
    const createdRestaurants = await Restaurant.insertMany(restaurants);
    console.log("✅ Restaurants inserted");

    // 3️⃣ Link foods to restaurants
    const foodsWithRestaurants = foods.map((food, index) => ({
      ...food,
      restaurant: createdRestaurants[index % createdRestaurants.length]._id,
    }));

    // 4️⃣ Insert foods
    await Food.insertMany(foodsWithRestaurants);
    console.log("✅ Foods inserted");

    process.exit(); // exit after seeding
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

seedDatabase();
