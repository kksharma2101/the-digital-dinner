import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Menu = ({ addToCart }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/menu');
        setMenuItems(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading) return <div>Loading menu...</div>;

  return (
    <div className="menu">
      <h2>Our Menu</h2>
      <div className="menu-items">
        {menuItems.map(item => (
          <div key={item._id} className="menu-item">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>${item.price.toFixed(2)}</p>
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;