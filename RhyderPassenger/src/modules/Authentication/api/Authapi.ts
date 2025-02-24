// src/api/authApi.ts

import {ApiName} from '../../../api/apiName';
import apiClient from '../../../api/axiosInstance';
import {
  ForgetPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  VerifyOtpRequest,
} from '../../../utils/ConstantTypes/authTypes';

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
export const verifyOtp = async (credential: VerifyOtpRequest) => {
  try {
    const response = await apiClient.post(ApiName.auth.verifyOtp, credential);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 3. Register
export const register = async (userData: RegisterRequest) => {
  try {
    const response = await apiClient.post(ApiName.auth.register, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 4. Login
export const login = async (credentials: LoginRequest) => {
  try {
    const response = await apiClient.post(ApiName.auth.login, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 5. Logout
export const logout = async (refreshToken: string) => {
  try {
    const response = await apiClient.post(ApiName.auth.logout, {
      refreshToken: refreshToken,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 7. Refresh Token
export const getRefreshToken = async (refreshToken: string) => {
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
export const forgotPassword = async (data: ForgetPasswordRequest) => {
  try {
    const response = await apiClient.post(ApiName.auth.forgotPassword, data);
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
export const resetPassword = async (data: ResetPasswordRequest) => {
  try {
    const response = await apiClient.post(ApiName.auth.resetPassword, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
