// src/types/authTypes.ts

// Send OTP Request
export interface SendOtpRequest {
  phoneNumber: string;
}

// Verify OTP Request
export interface VerifyOtpRequest {
  phoneNumber: string;
  otp: string;
}

// Register Request
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  role?: string;
}

// Login Request
export interface LoginRequest {
  email: string;
  password: string;
}

// Auth Response (Login, Register, Verify OTP)
export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
  };
}

// Logout Response (Common for logout, forgot password, reset password, etc.)
export interface SuccessResponse {
  message: string;
}

// Profile Response
export interface ProfileResponse {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
}

// Refresh Token Request
export interface RefreshTokenRequest {
  refreshToken: string;
}

// Forgot Password Request
export interface ForgotPasswordRequest {
  email: string;
}

// Verify Password Reset OTP Request
export interface VerifyPasswordResetOtpRequest {
  phoneNumber: string;
  otp: string;
}

// Reset Password Request
export interface ResetPasswordRequest {
  phoneNumber: string;
  newPassword: string;
  confirmPassword: string;
  otp: string;
}

export type ApiResponse<T> = {
  isSuccess: boolean;
  message: string;
  data: T;
  errors: string[];
};

// Example usage for your specific response:
export type OtpResponse = ApiResponse<string>;

export type VerifyApiResponse<T> = {
  isSuccess: boolean;
  message: string;
  data: T;
  errors: string[];
};

// Example usage for OTP response
export type VerifyOtpResponse = ApiResponse<string | null>;
