import axios from 'axios';

const API_BASE_URL = '/api'; // Assuming backend runs on the same host/port during dev

export const getMenu = async (category) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/menu${category ? `?category=${category}` : ''}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getMenuCategories = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/menu/categories`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const placeOrder = async (orderData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/orders`, orderData);
        return response.data;
    } catch (error) {
        throw error;
    }
};