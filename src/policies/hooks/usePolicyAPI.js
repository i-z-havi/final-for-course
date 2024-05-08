import axios from 'axios';
const apiUrl = "https://localhost:7192/api"


export const createPolicy = async (policy) => {
    try {
        const { data } = axios.post(`${apiUrl}/Policy`,policy);
        return data;
    }
    catch (error) {
        return Promise.reject(error.message);
    }
}


