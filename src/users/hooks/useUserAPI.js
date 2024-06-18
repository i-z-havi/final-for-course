import axios from "axios";
const API_URL = "https://localhost:7192/api";

export const getUser = async (id) => {
  try {
    const { data } = await axios.get(`${API_URL}/Users/${id}`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getUsers = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/Users`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const createUser = async (user) => {
  try {
    const { data } = await axios.post(`${API_URL}/Users`, user);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const updateUser = async (updatedUser, id) => {
  try {
    const { data } = await axios.put(`${API_URL}/Users/${id}`, updatedUser);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const loginUser = async (loginInfo) => {
  try {
    const { data } = await axios.post(`${API_URL}/Users/login`, loginInfo);
    return data;
  } catch (error) {
    if (error.response) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
  }
};

export const deleteUser = async (id) => {
  try {
    const { data } = await axios.delete(`${API_URL}/Users/${id}`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};
