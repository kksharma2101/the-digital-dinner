import express from "express";
import { isAdmin, userVerify } from "../middleware/authMiddleware.js";
import {
  createProduct,
  getAllProduct,
  getProductPhoto,
  getSingleProduct,
  productByCategory,
  productCount,
  productFilter,
} from "../controllers/menuController.js";
import formidable from "express-formidable";

const router = express.Router();

// create product router
router.post(
  "/create-menu-item",
  userVerify,
  isAdmin,
  formidable(),
  createProduct
);

// get all product
router.get("/get-menu-product", getAllProduct);

//get single product
router.get("/single-product/:slug", getSingleProduct);

// get product photo
router.get("/product-photo/:pid", getProductPhoto);

// filter product
router.post("/filter-product", productFilter);

// product count
router.get("/product-count", productCount);

// product list
// router.get("/product-list/:page", productList);

// get product by category
router.get("/category-product/:slug", productByCategory);

// token braintree router
// router.get("/braintree/token", tokenBraintree);

// payment braintree router
// router.post("/braintree/payment", userVerify, paymentBraintree);

export default router;
