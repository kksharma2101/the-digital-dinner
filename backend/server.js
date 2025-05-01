import "dotenv/config";
import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import menuItemsRouter from "./routes/menuItemRoutes.js";
import ordersRouter from "./routes/orderRoutes.js";
import { connectMongoDB, connectPostgreSQL } from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// connect database
connectMongoDB();
// connectPostgreSQL();

// Routes
app.use("/api", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/menu-product", menuItemsRouter);
app.use("/api/orders", ordersRouter);

app.use("/test", function (req, res) {
  res.send("server is live");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
