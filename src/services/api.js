// client/src/services/api.js

import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

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
export const sendOtp = (phoneNumber) => {
  return postData("auth/send", { phoneNumber });
};

export const validateOtp = (phoneNumber, otp) => {
  return postData("auth/validate", { phoneNumber, otp });
};

export const resendOtp = (phoneNumber) => {
  return postData("auth/send", { phoneNumber });
};

export const getUserProfile = (phoneNumber) => {
  return getData("user/getUsers", { phoneNumber });
};
