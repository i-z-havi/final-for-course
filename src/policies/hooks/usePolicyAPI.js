import axios from 'axios';
const apiUrl = "https://localhost:7192/api"


export const createPolicy = async (policy) => {
    try {
        const { data } = await axios.post(`${apiUrl}/Policy`, policy);
        return data;
    }
    catch (error) {
        return Promise.reject(error.message);
    }
};

export const deletePolicy = async (id) => {
    try {
        const { data } = await axios.delete(`${apiUrl}/Policy/${id}`)
        return data;
    } catch (error) {
        return Promise.reject(error.message)
    }
}

export const getPolicy = async (id) => {
    try {
        const { data } = await axios.get(`${apiUrl}/Policy/${id}`);
        return data;
    }
    catch (error) {
        return Promise.reject(error.message)
    }
}

export const getPolicies = async () => {
    try {
        const response = await axios.get(`${apiUrl}/Policy`)
        const data = response.data
        return data
    }
    catch (error) {
        return Promise.reject(error.message)
    }
};

export const updatePolicy = async (id, policy) => {
    try {
        const { data } = await axios.put(`${apiUrl}/Policy/${id}`, policy)
        return data;
    } catch (error) {
        return Promise.reject(error.message)
    }
}

export const signPolicy = async (id) => {
    try {
        const { data } = axios.patch(`${apiUrl}/Policy/${id}`)
        console.log(data);
        return data
    }
    catch (error) {
        return Promise.reject(error.message)
    }
}

export const getMyPolicies = async () => {
    try {
        const response = await axios.get(`${apiUrl}/Policy/my_petitions`)
        const data = response.data
        console.log(data);
        return data
    }
    catch (error) {
        return Promise.reject(error.message);
    }
};

export const getPendingPolicies = async () => {
    try {
        const response = await axios.get(`${apiUrl}/Policy/pending`)
        const data = response.data
        return data
    }
    catch (error) {
        return Promise.reject(error.message);
    }
}

export const allowPolicy = async (id) => {
    try {
        console.log(id);
        const response = await axios.patch(`${apiUrl}/Policy/allow/${id}`)
        const data = response.data
        return data
    }
    catch (error) {
        return Promise.reject(error.message);
    }
}