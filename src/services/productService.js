import axios from 'axios';
import {BASE_API_URL} from "../../config.js";

const API_URL = BASE_API_URL + '/api/products';

export const getProducts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error
    }
}

export const getMenuProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/menu?`);
        return response;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error
    }
}

export const getEcommerceProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/take-away`);
        return response;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error
    }
}
  
export const createProduct = async (formData) => {
    try {
        const response = await axios.post(API_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response;
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
}
  
export const updateProduct = async (id, formData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response;
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
}

export const deleteProduct = async (id) => {
    try{
        const response = await axios.delete(`${API_URL}/${id}`, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response;
    } catch (error){
        console.error("Error deleting product");
        throw error
    }
}