import axios from 'axios';
import Config from 'react-native-config';
import {getStorageItem} from '../utils/Storage/storage';
import {STORAGE_KEY} from '../utils/Storage/storageKeys';

// Base URL Configuration
export const apiClient = axios.create({
  baseURL: 'https://rhyderapi.k-asoftech.com', // Replace with your actual API URL
  timeout: 10000, // Set request timeout (in ms)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Flag to track token refresh
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// Request Interceptor (Attach token conditionally)
apiClient.interceptors.request.use(
  async config => {
    // Check if the URL contains "/api/auth/"
    if (config.url?.includes('/api/auth/')) {
      return config; // Skip token attachment for authentication endpoints
    }

    // Attach token for other requests
    const token = await getStorageItem(STORAGE_KEY.AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// Response Interceptor (Handle Errors Globally)
apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    const refreshToken = await getStorageItem(STORAGE_KEY.REFRESH_TOKEN);
    if (!refreshToken) throw new Error('No refresh token available');

    // If error is 401 or 403 and request has not been retried
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise(resolve => {
          refreshSubscribers.push(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(apiClient(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const newToken = await refreshToken(refreshToken);

      if (newToken) {
        apiClient.defaults.headers.Authorization = `Bearer ${newToken}`;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        refreshSubscribers.forEach(callback => callback(newToken));
        refreshSubscribers = [];
        isRefreshing = false;

        return apiClient(originalRequest); // Retry the failed request with new token
      } else {
        isRefreshing = false;
      }
    }

    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export default apiClient;
