import {
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
  sendOtp,
  verifyOtp,
} from '../api/Authapi';
import {
  authenticationError,
  authenticationLoaded,
  authenticationLoading,
  forgotPasswordResponse,
  loginUserData,
  otpSendResponse,
  otpVerifyResponse,
  resetPasswordResponse,
  signupResponse,
} from './authSlice';
import {
  ApiResponse,
  uploadDocumentResponse,
  ForgetPasswordRequest,
  ForgotPasswordResponse,
  RegisterRequest,
  ResetPasswordRequest,
  SignupResponse,
  VerifyOtpRequest,
  LoginRequest,
  OtpResponse,
  UserDataResponse,
  VerifyOtpResponse,
  documentDeleteResponse,
} from '../../../utils/ConstantTypes/authTypes';
import {getStorageItem, setStorageItem} from '../../../utils/Storage/storage';
import {STORAGE_KEY} from '../../../utils/Storage/storageKeys';
import {
  deleteDocument,
  getUploadedDocuments,
  uploadIdentity,
} from '../api/DocumentApi';
import {Alert} from 'react-native';
import {AppString} from '../../../utils/AppString';
import {clearUserAllData} from '../../../utils/ConstantTypes/globalFunctions';
import { replace } from '../../../utils/NavigationService';

export const callSendOtpApi = async (phoneNumber: string, dispatch: any) => {
  try {
    dispatch(authenticationLoading());
    const response: OtpResponse = await sendOtp(phoneNumber);
    if (response.isSuccess) {
      dispatch(otpSendResponse(response.data));
    } else {
      dispatch(authenticationError(response.errors[0]));
    }
    dispatch(authenticationLoaded());
  } catch (error) {
    dispatch(authenticationLoaded());
    throw error;
  }
};

export const callVerifyOtpApi = async (
  credential: VerifyOtpRequest,
  dispatch: any,
) => {
  try {
    dispatch(authenticationLoading());
    const response: VerifyOtpResponse = await verifyOtp(credential);
    if (response.isSuccess) {
      dispatch(otpVerifyResponse(response.data));
    } else {
      dispatch(authenticationError(response.errors[0]));
    }
    dispatch(authenticationLoaded());
  } catch (error) {
    dispatch(authenticationLoaded());
    throw error;
  }
};

export const callLoginApi = async (credential: LoginRequest, dispatch: any) => {
  try {
    dispatch(authenticationLoading());
    const response: ApiResponse<UserDataResponse> = await login(credential);
    if (response.isSuccess) {
      setStorageItem(STORAGE_KEY.USER_DETAIL, response.data);
      setStorageItem(STORAGE_KEY.AUTH_TOKEN, response.data.token);
      setStorageItem(STORAGE_KEY.REFRESH_TOKEN, response.data.refreshToken);
      dispatch(loginUserData(response.data));
    } else {
      dispatch(authenticationError(response.errors[0]));
    }
    dispatch(authenticationLoaded());
  } catch (error) {
    dispatch(authenticationLoaded());
    throw error;
  }
};

export const callSignupApi = async (
  userSignupData: RegisterRequest,
  dispatch: any,
) => {
  try {
    dispatch(authenticationLoading());
    const response: SignupResponse = await register(userSignupData);
    if (response.isSuccess) {
      dispatch(signupResponse(response.data));
    } else {
      dispatch(authenticationError(response.errors[0]));
    }
    dispatch(authenticationLoaded());
  } catch (error) {
    throw error;
  }
};

export const callForgotPasswordApi = async (
  forgetPasswordData: ForgetPasswordRequest,
  dispatch: any,
) => {
  try {
    dispatch(authenticationLoading());
    const response: ForgotPasswordResponse = await forgotPassword(
      forgetPasswordData,
    );
    if (response.isSuccess) {
      dispatch(forgotPasswordResponse(response.data));
    } else {
      dispatch(authenticationError(response.errors[0]));
    }
    dispatch(authenticationLoaded());
  } catch (error) {
    dispatch(authenticationLoaded());
    throw error;
  }
};

export const callResetPasswordApi = async (
  resetPasswordData: ResetPasswordRequest,
  dispatch: any,
) => {
  try {
    dispatch(authenticationLoading());
    const response: ForgotPasswordResponse = await resetPassword(
      resetPasswordData,
    );
    if (response.isSuccess) {
      dispatch(resetPasswordResponse(response.data));
    } else {
      dispatch(authenticationError(response.errors[0]));
    }
    dispatch(authenticationLoaded());
  } catch (error) {
    dispatch(authenticationLoaded());
    throw error;
  }
};

// Document API
export const callUploadIdentityApi = async (
  dispatch: any,
  documentType: string,
  formData: FormData,
  onProgress: (progress: number) => void,
) => {
  try {
    const response: ApiResponse<uploadDocumentResponse> = await uploadIdentity(
      documentType,
      formData,
      (progress: number) => {
        onProgress(progress);
      },
    );
    dispatch(authenticationLoaded());
    if (response.isSuccess) {
      return response.data;
    } else {
      dispatch(authenticationError(response.errors[0]));
    }
  } catch (error) {
    dispatch(authenticationLoaded());
    throw error;
  }
};

export const callDeleteDocumentApi = async (
  dispatch: any,
  documentID: number,
) => {
  try {
    dispatch(authenticationLoading());
    const response: ApiResponse<documentDeleteResponse> = await deleteDocument(
      documentID,
    );
    dispatch(authenticationLoaded());
    if (response.isSuccess) {
      Alert.alert('', AppString.screens.auth.uploadDocuments.docDeleteSuccess);
      return response.data;
    } else {
      dispatch(authenticationError(response.errors[0]));
    }
  } catch (error) {
    dispatch(authenticationLoaded());
    throw error;
  }
};

// get uploaded Documents API
export const callGetUploadedDocumentsApi = async (dispatch: any) => {
  try {
    dispatch(authenticationLoading());
    const response: ApiResponse<uploadDocumentResponse> =
      await getUploadedDocuments();
    dispatch(authenticationLoaded());
    if (response.isSuccess) {
      return response.data;
    } else {
      dispatch(authenticationError(response.errors[0]));
    }
  } catch (error) {
    dispatch(authenticationLoaded());
    throw error;
  }
};

// get uploaded Documents API
export const callLogoutApi = async (dispatch: any) => {
  try {
    dispatch(authenticationLoading());
    const refreshToken = getStorageItem(STORAGE_KEY.REFRESH_TOKEN);
    const response = await logout(refreshToken);
    console.log
    dispatch(authenticationLoaded());
    clearUserAllData();
    replace(AppString.NavigationScreens.stackNavigator.Auth)
    if (response.isSuccess) {
      return response.data;
    } else {
      dispatch(authenticationError(response.errors[0]));
    }
  } catch (error) {
    dispatch(authenticationLoaded());
    clearUserAllData();
    replace(AppString.NavigationScreens.stackNavigator.Auth)
    throw error;
  }
};
