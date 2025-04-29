import express from "express";
import Order from "../models/order.js";

const router = express.Router();

// Create new order
router.post("/", async (req, res) => {
  try {
    const { customerName, items, total } = req.body;

    const order = await Order.create({
      customerName,
      items,
      total,
      status: "pending",
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
