import axios from "axios";
const API_URL = "https://localhost:7192/api";

export const createUser = async (user) => {
    try {
        const { data } = await axios.post(`${API_URL}/Users`, user);
        return data;
    }
    catch (error) {
        return Promise.reject(error.message);
    }
}

export const getUsers = async () => {
    try {
        const { data } = await axios.get(`${API_URL}/Users`);
        return data;
    }
    catch (error) {
        return Promise.reject(error.message);
    }
}