import express from "express";
import {
  createCategory,
  getAllCategory,
  getSingleCategory,
} from "../controllers/categoryController.js";
import { isAdmin, userVerify } from "../middleware/authMiddleware.js";

const router = express.Router();

// create category
router.post("/create-category", userVerify, isAdmin, createCategory);

// get all category
router.get("/get-category", getAllCategory);

// get single category
router.get("/single-category/:slug", getSingleCategory);

export default router;
