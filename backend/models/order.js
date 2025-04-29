import { DataTypes } from "sequelize";
import { connectOrderDb } from "../config/db.js";

const Order = connectOrderDb.define("Order", {
  customerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  items: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending",
  },
});

export default Order;
