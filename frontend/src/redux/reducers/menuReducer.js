// src/redux/reducers/menuReducer.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMenu = createAsyncThunk('menu/fetchMenu', async (category) => {
    const response = await axios.get(`/api/menu${category ? `?category=${category}` : ''}`);
    return response.data;
});

export const fetchMenuCategories = createAsyncThunk('menu/fetchMenuCategories', async () => {
    const response = await axios.get('/api/menu/categories');
    return response.data;
});

const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        items: [],
        categories: [],
        loading: false,
        error: null,
    },
    reducers: {
        // Optional: Set a selected category in the state
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenu.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMenu.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchMenu.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchMenuCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMenuCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchMenuCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setSelectedCategory } = menuSlice.actions;
export default menuSlice.reducer;