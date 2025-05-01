// src/components/Cart.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { removeItem, updateQuantity } from '../redux/reducers/cartReducer';
import { Link } from 'react-router-dom';

const CartContainer = styled.div`
    padding: 20px;
`;

const CartItem = styled.div`
    border-bottom: 1px solid #eee;
    padding: 10px 0;
    display: flex;
    align-items: center;
    gap: 20px;
`;

const ItemDetails = styled.div`
    flex-grow: 1;
`;

const QuantityInput = styled.input`
    width: 50px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    text-align: center;
`;

const RemoveButton = styled.button`
    padding: 5px 10px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #c82333;
    }
`;

const CheckoutButton = styled(Link)`
    display: inline-block;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    margin-top: 20px;

    &:hover {
        background-color: #0056b3;
    }
`;

function Cart() {
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const handleRemoveItem = (itemId) => {
        dispatch(removeItem(itemId));
    };

    const handleQuantityChange = (itemId, quantity) => {
        const parsedQuantity = parseInt(quantity, 10);
        if (!isNaN(parsedQuantity) && parsedQuantity > 0) {
            dispatch(updateQuantity({ itemId, quantity: parsedQuantity }));
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    if (cartItems.length === 0) {
        return <CartContainer><h2>Your Cart is Empty</h2><Link to="/">Back to Menu</Link></CartContainer>;
    }

    return (
        <CartContainer>
            <h2>Your Cart</h2>
            {cartItems.map(item => (
                <CartItem key={item.itemId}>
                    <ItemDetails>
                        <h3>{item.name}</h3>
                        <span>${item.price.toFixed(2)}</span>
                    </ItemDetails>
                    <div>
                        <label htmlFor={`quantity-${item.itemId}`}>Qty:</label>
                        <QuantityInput
                            type="number"
                            id={`quantity-${item.itemId}`}
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.itemId, e.target.value)}
                            min="1"
                        />
                    </div>
                    <RemoveButton onClick={() => handleRemoveItem(item.itemId)}>Remove</RemoveButton>
                </CartItem>
            ))}
            <h3>Total: ${calculateTotal()}</h3>
            <CheckoutButton to="/checkout">Proceed to Checkout</CheckoutButton>
            <Link to="/">Back to Menu</Link>
        </CartContainer>
    );
}

export default Cart;