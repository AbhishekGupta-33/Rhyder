// src/api/authApi.ts

import {ApiName} from '../../../api/apiName';
import apiClient from '../../../api/axiosInstance';

// 1. Send OTP
export const sendOtp = async (phoneNumber: string) => {
  try {
    const response = await apiClient.post(ApiName.auth.sendOtp, {phoneNumber});
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 2. Verify OTP
export const verifyOtp = async (phoneNumber: string, otp: string) => {
  try {
    const response = await apiClient.post(ApiName.auth.verifyOtp, {
      phoneNumber,
      otp,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 3. Register
export const register = async (userData: object) => {
  try {
    const response = await apiClient.post(ApiName.auth.register, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 4. Login
export const login = async (credentials: object) => {
  try {
    const response = await apiClient.post(ApiName.auth.login, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 5. Logout
export const logout = async () => {
  try {
    const response = await apiClient.post(ApiName.auth.logout);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 6. Get Profile
export const getProfile = async (token: string) => {
  try {
    const response = await apiClient.get(ApiName.auth.getProfile, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 7. Refresh Token
export const refreshToken = async (refreshToken: string) => {
  try {
    const response = await apiClient.post(ApiName.auth.refreshToken, {
      refreshToken,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 8. Forgot Password
export const forgotPassword = async (email: string) => {
  try {
    const response = await apiClient.post(ApiName.auth.forgotPassword, {email});
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 9. Verify Password Reset OTP
export const verifyPasswordResetOtp = async (otp: string) => {
  try {
    const response = await apiClient.post(ApiName.auth.verifyPasswordResetOtp, {
      otp,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 10. Reset Password
export const resetPassword = async (data: object) => {
  try {
    const response = await apiClient.post(ApiName.auth.resetPassword, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
