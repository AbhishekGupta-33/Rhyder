import {RefreshTokenRequest} from './authTypes';
// src/types/authTypes.ts

// Send OTP Request
export interface SendOtpRequest {
  phoneNumber: string;
}

// Verify OTP Request
export interface VerifyOtpRequest {
  phoneNumber: string;
  code: string;
}

// Register Request
export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: RoleType | string;
}

export enum RoleType {
  'Admin' = 1,
  'Driver' = 2,
  'Rider' = 3,
}

export enum DocumentType {
  'UserImage',
  'IdentityProof',
  'GenderIdentityProof',
}

// Login Request
export interface LoginRequest {
  identifier: string;
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

// // Reset Password Request
// export interface ResetPasswordRequest {
//   phoneNumber: string;
//   newPassword: string;
//   confirmPassword: string;
//   otp: string;
// }

export type ApiResponse<T> = {
  isSuccess: boolean;
  message: string;
  data: T;
  errors: string[];
};

// Example usage for your specific response:
export type OtpResponse = ApiResponse<string>;

export type documentDeleteResponse = ApiResponse<string>;

export type VerifyApiResponse<T> = {
  isSuccess: boolean;
  message: string;
  data: T;
  errors: string[];
};

export type UserDataResponse = {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  name: string;
  token: string;
  refreshToken: string;
  docIssue?: boolean;
};

export type uploadDocumentResponse = {
  id: number;
  type: number;
  fileUrl: string;
  status: number;
  uploadDate: string;
  fileName: string;
};

// Example usage for OTP response
export type VerifyOtpResponse = ApiResponse<string | null>;

export type SignupResponse = {
  isSuccess: boolean;
  message: string;
  data: string | null;
  errors: string[];
};

export type ForgotPasswordResponse = {
  isSuccess: boolean;
  message: string;
  data: string | null;
  errors: string[];
};
export type ForgetPasswordRequest = {
  identifier: string;
};

export type ResetPasswordRequest = {
  identifier: string;
  newPassword: string;
};

export type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: string;
  refreshTokenExpires: string;
};

// Change Password------

export type changePasswordInputRequest = {
  oldPassword: string;
  newPassword: string;
};

export type changePasswordInputResponse = ApiResponse<string | null>;