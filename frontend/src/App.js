import React, { useState } from "react";
import axios from "axios";
import Menu from "./components/Menu.jsx";
import Cart from "./components/Cart.jsx";
import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
  };

  const submitOrder = async (items, total) => {
    try {
      const order = {
        customerName: "Guest", // In a real app, get from auth
        items,
        total,
      };

      await axios.post("http://localhost:5000/api/orders", order);
      alert("Order placed successfully!");
      setCartItems([]);
    } catch (err) {
      console.error("Order submission failed:", err);
      alert("Failed to place order");
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Restaurant Ordering System</h1>
      </header>
      <main>
        <Menu addToCart={addToCart} />
        <Cart
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          submitOrder={submitOrder}
        />
      </main>
    </div>
  );
}

export default App;
