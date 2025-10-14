import express from "express";
import { getFoods } from "../controllers/foodController.js";

const router = express.Router();

// GET → /api/foods
router.get("/", getFoods);

export default router;
