import axios from "axios";
import Config from "react-native-config";

// Base URL Configuration
export const apiClient = axios.create({
  baseURL: "https://rhyderapi.k-asoftech.com", // Replace with your actual API URL
  timeout: 10000, // Set request timeout (in ms)
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor (Attach token if available)
apiClient.interceptors.request.use(
  async (config) => {
    const token = ""; // Retrieve token from storage or Redux
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor (Handle Errors Globally)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
