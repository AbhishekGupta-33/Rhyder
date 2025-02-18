import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  AuthenticationState,
  signUpDataType,
} from '../../../utils/ConstantTypes/Redux';

export const initialState: AuthenticationState = {
  isAuthenticated: false,
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
};

export const authenticationSlice = createSlice({
  name: 'Authentication',
  initialState,
  reducers: {
    userData: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    clearUserData: state => {
      state.isAuthenticated = false;
      state.token = null;
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
      (state.loading = false), (state.loaded = true), (state.error = undefined);
    },
    authenticationError: (state, action: PayloadAction<Error>) => {
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
  },
});

export const {
  userData,
  clearUserData,
  setSignupDetails,
  authenticationLoading,
  authenticationLoaded,
  authenticationError,
  authenticationSignupNumber,

  //Api handler
  otpSendResponse,
  otpVerifyResponse,
} = authenticationSlice.actions;
export const authenticationReducer = authenticationSlice.reducer;
