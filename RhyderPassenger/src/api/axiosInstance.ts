import axios from 'axios';
import Config from 'react-native-config';
import { getStorageItem } from '../utils/Storage/storage';
import { STORAGE_KEY } from '../utils/Storage/storageKeys';
import { getRefreshToken } from '../modules/Authentication/api/Authapi';

// Base URL Configuration
export const apiClient = axios.create({
  baseURL: 'https://rhyderapi.k-asoftech.com',
  timeout: 10000,
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
    try {
      if (config.url?.includes('/api/auth/')) {
        return config;
      }

      const token = await getStorageItem(STORAGE_KEY.AUTH_TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.error('Request interceptor error:', error);
      return Promise.reject(error);
    }
  },
  error => Promise.reject(error),
);

// Response Interceptor (Handle Errors Globally)
apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (!originalRequest) return Promise.reject(error);

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

      try {
        const refreshToken = await getStorageItem(STORAGE_KEY.REFRESH_TOKEN);
        if (!refreshToken) throw new Error('No refresh token available');

        const newToken = await getRefreshToken(refreshToken);
        if (!newToken) throw new Error('Failed to refresh token');

        apiClient.defaults.headers.Authorization = `Bearer ${newToken}`;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        refreshSubscribers.forEach(callback => callback(newToken));
        refreshSubscribers = [];

        return apiClient(originalRequest);
      } catch (error) {
        console.error('Token refresh failed:', error);
      } finally {
        isRefreshing = false;
      }
    }

    console.error('API Error:', error.response?.data || error.message || 'Unknown error');
    return Promise.reject(error);
  },
);

export default apiClient;
