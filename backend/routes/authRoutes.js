import express from "express";
import {
  login,
  register,
  getOrderController,
  getAllOrderController,
} from "../controllers/authController.js";
import { isAdmin, userVerify } from "../middleware/authMiddleware.js";

const router = express.Router();

// register router
router.post("/register", register);
// login router
router.post("/login", login);

// protected user route auth
router.get("/user-auth", userVerify, (req, res) => {
  res.status(200).send({ ok: true });
});

// protected admin route auth
router.get("/admin-auth", userVerify, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// order router
router.get("/orders", userVerify, getOrderController);

// get all orders
router.get("/all-orders", userVerify, isAdmin, getAllOrderController);

export default router;
