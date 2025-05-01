import { Sequelize } from "sequelize";
import mongoose from "mongoose";

// MongoDB connection (for menu items)
const connectMongoDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/mini_restaurant_menu");
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    // process.exit(1);
  }
};

// PostgreSQL connection (for orders)
const sequelize = new Sequelize(
  "postgresql://localhost:5432/mydatabase" || process.env.PG_URI,
  {
    dialect: "postgres",
    logging: false,
  }
);

const connectPostgreSQL = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL connected");
  } catch (error) {
    console.error("PostgreSQL connection error:", error);
    process.exit(1);
  }
};

export { sequelize, connectPostgreSQL, connectMongoDB };
