import axios from "axios";
import { checkError } from "../../helpers/checkError";
const apiUrl = process.env.REACT_APP_API_URL||"https://localhost:7192/api";

export const createPolicy = async (policy) => {
  try {
    const { data } = await axios.post(`${apiUrl}/Policy`, policy);
    return data;
  } catch (error) {
    console.log(error);
    if (error.response) {
      return Promise.reject(error.response.data);
    }
    return checkError(error)
  }
};

export const deletePolicy = async (id) => {
  try {
    const { data } = await axios.delete(`${apiUrl}/Policy/${id}`);
    return data;
  } catch (error) {
    return checkError(error)
  }
};

export const getPolicy = async (id) => {
  try {
    const { data } = await axios.get(`${apiUrl}/Policy/${id}`);
    return data;
  } catch (error) {
    return checkError(error)
  }
};

export const getPolicies = async () => {
  try {
    const response = await axios.get(`${apiUrl}/Policy`);
    const data = response.data;
    return data;
  } catch (error) {
    return checkError(error)
  }
};

export const updatePolicy = async (id, policy) => {
  try {
    const { data } = await axios.put(`${apiUrl}/Policy/${id}`, policy);
    return data;
  } catch (error) {
    return checkError(error)
  }
};

export const signPolicy = async (id) => {
  try {
    const { data } = axios.patch(`${apiUrl}/Policy/${id}`);
    return data;
  } catch (error) {
    return checkError(error)
  }
};

export const getMyPolicies = async () => {
  try {
    const response = await axios.get(`${apiUrl}/Policy/my_petitions`);
    const data = response.data;
    return data;
  } catch (error) {
    return checkError(error)
  }
};

export const getPendingPolicies = async () => {
  try {
    const response = await axios.get(`${apiUrl}/Policy/pending`);
    const data = response.data;
    return data;
  } catch (error) {
    return checkError(error)
  }
};

export const allowPolicy = async (id) => {
  try {
    const response = await axios.patch(`${apiUrl}/Policy/allow/${id}`);
    const data = response.data;
    return data;
  } catch (error) {
    return checkError(error)
  }
};
