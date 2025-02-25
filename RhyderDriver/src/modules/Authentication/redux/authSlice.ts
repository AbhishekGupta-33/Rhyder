import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  AuthenticationState,
  signUpDataType,
} from '../../../utils/ConstantTypes/Redux';
import { UserDataResponse } from '../../../utils/ConstantTypes/authTypes';

export const initialState: AuthenticationState = {
  isAuthenticated: false,
  userData: null,
  token: null,
  signUpData: {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: '',
    email: '',
  },
  loading: false,
  loaded: false,
  error: undefined,
  otpSendSuccessMessage: '',
  otpVerifySuccessMessage: '',
  signupSuccessMessage:'',
  forgetPasswordSuccessMessage:'',
  resetPasswordSuccessMessage:''
};

export const authenticationSlice = createSlice({
  name: 'Authentication',
  initialState,
  reducers: {
    loginUserData: (state, action: PayloadAction<UserDataResponse>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.userData = action.payload;
    },
    clearUserData: state => {
      state.isAuthenticated = false;
      state.token = null;
      state.userData = null;
    },
    setSignupDetails: (state, action: PayloadAction<signUpDataType>) => {
      state.signUpData = action.payload;
    },
    authenticationSignupNumber: (state, action: PayloadAction<string>) => {
      state.signUpData.phoneNumber = action.payload;
    },
    authenticationLoading: state => {
      (state.loading = true), (state.loaded = false), (state.error = undefined);
    },
    authenticationLoaded: state => {
      (state.loading = false), (state.loaded = true);
    },
    authenticationError: (state, action: PayloadAction<Error | string>) => {
      (state.loading = false),
        (state.loaded = true),
        (state.error = action.payload);
    },
    otpSendResponse: (state, action: PayloadAction<string>) => {
      state.otpSendSuccessMessage = action.payload;
    },
    otpVerifyResponse: (state, action: PayloadAction<string | null>) => {
      state.otpVerifySuccessMessage = action.payload;
    },
    signupResponse: (state, action: PayloadAction<string | null>) => {
      state.signupSuccessMessage = action.payload;
    },
    forgotPasswordResponse:(state, action: PayloadAction<string | null>) => {
      state.forgetPasswordSuccessMessage = action.payload;
    },
    resetPasswordResponse:(state, action: PayloadAction<string | null>) => {
      state.resetPasswordSuccessMessage = action.payload;
    },
  },
});

export const {
  loginUserData,
  clearUserData,
  setSignupDetails,
  authenticationLoading,
  authenticationLoaded,
  authenticationError,
  authenticationSignupNumber,

  //Api handler
  otpSendResponse,
  otpVerifyResponse,
  signupResponse,
  forgotPasswordResponse,
  resetPasswordResponse
} = authenticationSlice.actions;
export const authenticationReducer = authenticationSlice.reducer;
