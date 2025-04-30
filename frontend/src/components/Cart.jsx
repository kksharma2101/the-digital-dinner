import React from 'react';

const Cart = ({ cartItems, removeFromCart, submitOrder }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart">
      <h2>Your Order</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price.toFixed(2)}
                <button onClick={() => removeFromCart(index)}>Remove</button>
              </li>
            ))}
          </ul>
          <p>Total: ${total.toFixed(2)}</p>
          <button onClick={() => submitOrder(cartItems, total)}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;