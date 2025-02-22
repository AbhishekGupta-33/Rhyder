import axios from 'axios';

// Base URL Configuration
export const apiClient = axios.create({
  baseURL: 'https://rhyderapi.k-asoftech.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
export default apiClient;
