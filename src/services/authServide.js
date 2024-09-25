import axios from 'axios'

const API_URL = 'http://localhost:8080/api/auth'

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
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
    window.location.href = '/login';
};

export const updatePassword = async (credentials) => {
    try {
        const response = await axios.put(`${API_URL}/update-password`, credentials, {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response;
    } catch (error) {
        return error
    }
};

export const validateToken = async (token) => {
    try {
        const response = await axios.post(`${API_URL}/validate-token`, token, {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response;
    } catch (error) {
        return error
    }
};