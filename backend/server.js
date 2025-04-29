import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectMenuDb, connectOrderDb } from "./config/db.js";
import menuItemsRouter from "./routes/menuItem.js";
import ordersRouter from "./routes/order.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/menu", menuItemsRouter);
app.use("/api/orders", ordersRouter);

// Test database connections
const testConnections = async () => {
  try {
    await connectMenuDb.connection;
    console.log("Connected to MongoDB");
    // await connectOrderDb.authenticate();
    // console.log("Connected to PostgreSQL");
  } catch (err) {
    console.error("Connection error:", err);
  }
};

testConnections();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
