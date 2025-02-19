import { UserDataResponse } from "./authTypes";

export type signUpDataType = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password?: string;
  email: string;
};

export type AuthenticationState = {
  isAuthenticated: boolean;
  userData: UserDataResponse| null,
  token: string | null;
  signUpData: signUpDataType;
  loading: boolean;
  loaded: boolean;
  error: Error | undefined | string;
  otpSendSuccessMessage: string;
  otpVerifySuccessMessage: string | null;
};

export type ReduxState = Record<string, any> & {
  Authentication: AuthenticationState;
};

export type GetState = () => ReduxState;
