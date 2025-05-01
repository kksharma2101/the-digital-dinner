import { model, Schema } from "mongoose";

const menuItemSchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    category: { type: String, required: true },
    photo: {
      data: Buffer,
      contentType: String,
    },
    slug: {
      type: String,
      required: true,
    },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const menuItem = model("Menu-product", menuItemSchema);
export default menuItem;
