// backend/routes/menuItems.js
import express from "express";
import MenuItem from "../models/menuItem.js";

const router = express.Router();

// Get all menu items
router.get("/", async (req, res) => {
  try {
    const items = await MenuItem.find({ available: true });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

