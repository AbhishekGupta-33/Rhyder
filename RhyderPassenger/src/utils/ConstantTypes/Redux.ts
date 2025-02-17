export type signUpDataType = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password?: string;
  email: string;
};

export type AuthenticationState = {
  isAuthenticated: boolean;
  token: string | null;
  signUpData: signUpDataType;
  loading: boolean;
  loaded: boolean;
  error: Error | undefined;
}

export type ReduxState = Record<string, any> & {
  Authentication:AuthenticationState
}

export type GetState = () => ReduxState
