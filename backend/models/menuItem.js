import { Schema, model } from "mongoose";

const menuItemSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: String,
  available: { type: Boolean, default: true },
});
const menuItem = model("MenuItem", menuItemSchema);

export default menuItem;
