import menuItem from "../models/menuModel.js";
import categoryModel from "../models/categoryModel.js";
import fs from "fs";
import slugify from "slugify";

// create product
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.fields;
    const { photo } = req.files;
    if (!(name, price, description, category)) {
      return res.status(400).json({
        message: "All field is required",
      });
    }
    if (!photo && photo.size > 100000) {
      return res.status(400).send({
        message: "Photo is required and should be less then 1mb",
      });
    }
    const product = new menuItem({ ...req.fields, slug: slugify(name) });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(200).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "Error in create product",
      error,
    });
  }
};

// get all product
export const getAllProduct = async (req, res) => {
  try {
    const product = await menuItem
      .find({})
      .populate("category")
      .select("-photo")
      // .limit(10)
      // .sort({ createdAt: -1 });
    if (!product) {
      return res.status(400).send({
        message: "Product is not get try again",
      });
    }

    res.status(200).json({
      success: true,
      TotalCount: product.length,
      message: "Get all menuItem list",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "Error in getting product",
      error,
    });
  }
};

// get single product
export const getSingleProduct = async (req, res) => {
  try {
    const product = await menuItem
      .findOne({ slug: req.params.slug })
      .populate("category")
      .select("-photo");

    res.status(200).send({
      success: true,
      message: "Product list get successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "Error in getting single product",
      error,
    });
  }
};

// product photo
export const getProductPhoto = async (req, res) => {
  try {
    const product = await menuItem.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "Error while getting in product photo",
      error,
    });
  }
};

// filter product
export const productFilter = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const product = await menuItem.find(args);
    res.status(200).send({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering menuItem",
      error,
    });
  }
};

// product count
export const productCount = async (req, res) => {
  try {
    const total = await menuItem.find({}).estimatedDocumentCount();
    res.status(200).json({
      success: true,
      total,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Error in proudct count",
      error,
    });
  }
};

//get product by category
export const productByCategory = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const product = await menuItem.find({ category });

    res.status(200).json({
      success: true,
      category,
      product,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Error while in get product by category",
      error,
    });
  }
};
