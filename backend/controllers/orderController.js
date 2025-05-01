import Order from "../models/orderModel.js";

const placeOrder = async (req, res) => {
  const { userId, cartItems, totalPrice } = req.body;

  try {
    const order = await Order.create({
      userId,
      items: cartItems,
      totalPrice,
    });
    res
      .status(201)
      .json({ message: "Order placed successfully", orderId: order.id });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Failed to place order" });
  }
};

export { placeOrder };
