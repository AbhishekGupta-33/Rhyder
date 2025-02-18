import {login, sendOtp, verifyOtp} from '../api/Authapi';
import {
  authenticationError,
  authenticationLoaded,
  authenticationLoading,
  loginUserData,
  otpSendResponse,
  otpVerifyResponse,
} from './authSlice';
import {
  ApiResponse,
  LoginRequest,
  OtpResponse,
  uploadDocumentResponse,
  UserDataResponse,
  VerifyOtpResponse,
} from '../../../utils/ConstantTypes/authTypes';
import {setStorageItem} from '../../../utils/Storage/storage';
import {STORAGE_KEY} from '../../../utils/Storage/storageKeys';
import {uploadIdentity} from '../api/DocumentApi';

export const callSendOtpApi = async (phoneNumber: string, dispatch: any) => {
  try {
    dispatch(authenticationLoading());
    const response: OtpResponse = await sendOtp(phoneNumber);
    if (response.isSuccess) {
      dispatch(otpSendResponse(response.data));
    } else {
    }
    dispatch(authenticationLoaded());
  } catch (error) {
    dispatch(authenticationLoaded());
    throw error;
  }
};

export const callVerifyOtpApi = async (
  phoneNumber: string,
  code: string,
  dispatch: any,
) => {
  try {
    dispatch(authenticationLoading());
    const response: VerifyOtpResponse = await verifyOtp(phoneNumber, code);
    if (response.isSuccess) {
      dispatch(otpVerifyResponse(response.data));
    } else {
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
