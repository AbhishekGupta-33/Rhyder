import {UserDataResponse} from './authTypes';

export type signUpDataType = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password?: string;
  email: string;
};

export type AuthenticationState = {
  isAuthenticated: boolean;
  userData: UserDataResponse | null;
  token: string | null;
  signUpData: signUpDataType;
  loading: boolean;
  loaded: boolean;
  error: Error | undefined | string;
  otpSendSuccessMessage: string;
  otpVerifySuccessMessage: string | null;
  signupSuccessMessage: string | null;
  forgetPasswordSuccessMessage: string | null;
  resetPasswordSuccessMessage: string | null;
};
export type ProfileDataType = {
  id: number | string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  roleId: number | string;
};

export type UserState = {
  firstName: string;
  lastName: string;
  email: string;
  profilePic: string | null;
  loading: boolean;
  loaded: boolean;
  error: Error | undefined | string;
  profileData: ProfileDataType;
};

export type ReduxState = Record<string, any> & {
  Authentication: AuthenticationState;
  User: UserState;
};

export type GetState = () => ReduxState;
