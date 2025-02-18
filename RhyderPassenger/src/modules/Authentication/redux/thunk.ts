import {sendOtp, verifyOtp} from '../api/Authapi';
import {
  authenticationLoaded,
  authenticationLoading,
  otpSendResponse,
  otpVerifyResponse,
} from './authSlice';
import {OtpResponse, VerifyOtpResponse} from '../../../utils/ConstantTypes/authTypes';

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
    throw error;
  }
};
