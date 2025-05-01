// src/components/Checkout.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { clearCart } from '../redux/reducers/cartReducer';
import { placeOrder } from '../api';
import { useNavigate, Link } from 'react-router-dom';

const CheckoutContainer = styled.div`
    padding: 20px;
`;

const CheckoutForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 20px;
`;

const Input = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const SubmitButton = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const OrderConfirmation = styled.div`
    margin-top: 20px;
    padding: 15px;
    border: 1px solid #eee;
    border-radius: 5px;
    background-color: #f9f9f9;
`;

function Checkout() {
    const cartItems = useSelector(state => state.cart.items);
    const totalPrice = useSelector(state => state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [orderConfirmation, setOrderConfirmation] = useState(null);
    const [error, setError] = useState(null);

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        if (!name.trim() || !phoneNumber.trim()) {
            setError('Please provide your name and phone number.');
            return;
        }

        const orderData = {
            userId: phoneNumber, // Using phone number as a simple user identifier
            cartItems: cartItems.map(item => ({ itemId: item.itemId, quantity: item.quantity })),
            totalPrice: parseFloat(totalPrice),
        };

        try {
            const response = await placeOrder(orderData);
            setOrderConfirmation(`Order placed successfully! Your order ID is: ${response.orderId}`);
            dispatch(clearCart());
            setError(null);
            navigate('/'); // Redirect to the menu after placing order
        } catch (err) {
            console.error('Error placing order:', err);
            setError('Failed to place order. Please try again.');
            setOrderConfirmation(null);
        }
    };

    if (cartItems.length === 0) {
        return <CheckoutContainer><h2>Your cart is empty.</h2><Link to="/cart">Go to Cart</Link></CheckoutContainer>;
    }

    return (
        <CheckoutContainer>
            <h2>Checkout</h2>
            <CheckoutForm onSubmit={handlePlaceOrder}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <Input
                    type="tel"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
                <p>Total: ${totalPrice}</p>
                <SubmitButton type="submit">Place Order</SubmitButton>
            </CheckoutForm>

            {orderConfirmation && (
                <OrderConfirmation>
                    <p>{orderConfirmation}</p>
                    <Link to="/">Back to Menu</Link>
                </OrderConfirmation>
            )}
        </CheckoutContainer>
    );
}

export default Checkout;