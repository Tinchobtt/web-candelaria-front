import axios from 'axios';

const API_URL = 'http://localhost:8080/api/categories';

export const getCategories = async (active) => {
  try {
    const response = await axios.get(`${API_URL}?onlyActives=${active}`);
    return response;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const createCategory = async (categoryData) => {
  try {
    const response = await axios.post(API_URL, categoryData);
    return response;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};
