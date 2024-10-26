import axios from 'axios'
import {BASE_API_URL} from "../../config.js";

const API_URL = BASE_API_URL + '/api/address'

export const getAddress = async (street, number) => {
    try {
        const response = await axios.get(`${API_URL}?street=${encodeURIComponent(street)}%20&number=${encodeURIComponent(number)}`)
        return response.data;
    } catch (error) {
        console.error("Error fetching address:", error);
        throw error;
    }
};