import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5254/api";
export const getToDoItems = async () => {
  try {
    const response = await axios.get(`${API_URL}/todoitems`);
    return response.data;
  } catch (error) {
    console.error("Error while getting items:", error);
    throw error;
  }
};

export const getToDoItemById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/todoitems/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error while getting item ${id}:`, error);
    throw error;
  }
};

export const createToDoItem = async (item) => {
  try {
    const response = await axios.post(`${API_URL}/todoitems`, item);
    return response.data;
  } catch (error) {
    console.error("Error while creating item:", error);
    throw error;
  }
};

export const updateToDoItem = async (id, item) => {
  try {
    const response = await axios.put(`${API_URL}/todoitems/${id}`, item);
    return response.data;
  } catch (error) {
    console.error(`Error while updating item ${id}:`, error);
    throw error;
  }
};

export const deleteToDoItem = async (id) => {
  try {
    await axios.delete(`${API_URL}/todoitems/${id}`);
  } catch (error) {
    console.error(`Error while deleteing item ${id}:`, error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error("Error while getting categories:", error);
    throw error;
  }
};

export const createCategory = async (category) => {
  try {
    const response = await axios.post(`${API_URL}/categories`, category);
    return response.data;
  } catch (error) {
    console.error("Error while create category:", error);
    throw error;
  }
};
