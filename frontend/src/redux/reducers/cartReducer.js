import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [], // Array of { itemId: String, quantity: Number, name: String, price: Number }
    },
    reducers: {
        addItem: (state, action) => {
            const existingItem = state.items.find(item => item.itemId === action.payload._id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.items.push({ ...action.payload, itemId: action.payload._id, quantity: 1 });
            }
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.itemId !== action.payload);
        },
        updateQuantity: (state, action) => {
            const itemToUpdate = state.items.find(item => item.itemId === action.payload.itemId);
            if (itemToUpdate) {
                itemToUpdate.quantity = action.payload.quantity;
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;