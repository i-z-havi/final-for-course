import axios from 'axios';
const apiUrl = "https://localhost:7192/api"


export const createPolicy = async (policy) => {
    try {
        const { data } =await axios.post(`${apiUrl}/Policy`,policy);
        return data;
    }
    catch (error) {
        return Promise.reject(error.message);
    }
};

export const getPolicies=async()=>{
    try{
        const response = await axios.get(`${apiUrl}/Policy`)
        const data=response.data
        console.log(data);
        return data
    }
    catch (error){
        return Promise.reject(error.message)
    }
};


