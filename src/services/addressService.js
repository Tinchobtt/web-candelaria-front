import axios from 'axios'

const API_URL = 'http://localhost:8080/api/address'

export const getAddress = async (street, number) => {
    try {
        const response = await axios.get(`${API_URL}?street=${encodeURIComponent(street)}%20&number=${encodeURIComponent(number)}`)
        return response.data;
    } catch (error) {
        console.error("Error fetching address:", error);
        throw error;
    }
};