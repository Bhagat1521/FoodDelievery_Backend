import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  image: { type: String },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;
