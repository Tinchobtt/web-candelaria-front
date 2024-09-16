import axios from 'axios'

const API_URL = 'http://localhost:8080/api/login'

export const login = async (credentials) => {
    try {
        const response = await axios.post(API_URL, credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response;
    } catch (error) {
        return error
    }
};
  
export const logout = () => {
    localStorage.removeItem('token');
};