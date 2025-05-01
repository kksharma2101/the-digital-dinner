import {
  passwordCompare,
  passwordHash,
} from "../middleware/passwordMiddleware.js";
import User from "../models/userModel.js";
import JWT from "jsonwebtoken";
import orderModel from "../models/orderModel.js";

// register controllers
const register = async (req, res, next) => {
  try {
    const { name, email, password, phone, role } = req.body;
    // check conditions
    if (!(name, email, password, phone)) {
      return next(new Error("All field is required", 405));
    }

    // email exists
    const existsEmail = await User.findOne({ email });
    if (existsEmail) {
      return next(new Error("Email is already exists", 405));
    }

    // password bcrypt
    const passwordHashed = await passwordHash(password);

    // create user
    const user = await User.create({
      name,
      email,
      password: passwordHashed,
      phone,
      role,
    });
    if (!user) {
      return next(new Error("User is not register, try again", 405));
    }

    await user.save();
    user.password = undefined;

    // generate cookie
    const token = await JWT.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      }
    );

    // res.cookie("token", token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "User register successfully",
      user,
      token,
    });
  } catch (e) {
    return next(new Error(e.message, 404));
  }
};

// login controllers
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!(email, password)) {
      return next(new Error("All data require", 404));
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({
        success: false,
        message: "Email is not match",
      });
    }

    // compare password
    const match = await passwordCompare(password, user.password);
    if (!match) {
      return next(new Error("Password does not match", 404));
    }

    user.password = undefined;

    // generate jwt token
    const token = await JWT.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      }
    );

    // res.cookie("token", token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "User logged successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (e) {
    return next(new Error(e.message, 404));
  }
};

// order controller
const getOrderController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Error in order controller",
      error,
    });
  }
};

// get all orders
const getAllOrderController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name");
    // .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Error in getAllorder controller",
      error,
    });
  }
};

export { register, login, getOrderController, getAllOrderController };
