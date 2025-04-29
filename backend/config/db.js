import { Sequelize } from "sequelize";
import mongoose from "mongoose";

// MongoDB connection (for menu items)
export const connectMenuDb = async () => {
  try {
    const connect = await mongoose.connect(
      "mongodb://localhost:27017/",
      process.env.MONGO_URI
    );
    if (connect) {
      console.log("DB connected...");
    }
  } catch (e) {
    console.log(`${e.message}`.red);
    console.log("error");
  }
};

// PostgreSQL connection (for orders)
export const connectOrderDb = new Sequelize(
  "postgresql://localhost:5432/mydatabase" || process.env.PG_URI,
  {
    dialect: "postgres",
    logging: false,
  }
);
