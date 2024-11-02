// client/src/services/api.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

// Function for GET requests
export const getData = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${endpoint}`, {
      params,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("GET request failed:", error);
    throw error;
  }
};

// Function for POST requests
export const postData = async (endpoint, data = {}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("POST request failed:", error);
    throw error;
  }
};

// Example functions for specific API calls
// client/src/services/api.js

export const sendOtp = async (phoneNumber) => {
  const response = await postData("auth/send", { phoneNumber });
  return response; // return the full response to handle success status in the component
};

export const validateOtp1 = (phoneNumber, otp) => {
  return postData("auth/validate", { phoneNumber, otp });
};

export const getUserProfile = (phoneNumber) => {
  return getData("user/getUsers", { phoneNumber });
};
