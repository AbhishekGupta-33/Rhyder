import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type signUpDataType = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password?: string;
  email: string;
};
interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  signUpData: signUpDataType;
  loading: boolean;
  loaded: boolean;
  error: Error | undefined;
}

const initialState: AuthState = {
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
};

export const authenticationSlice = createSlice({
  name: 'auth',
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
  },
});

export const {
  userData,
  clearUserData,
  setSignupDetails,
  authenticationLoading,
  authenticationLoaded,
  authenticationError,
} = authenticationSlice.actions;
export const authenticationReducer = authenticationSlice.reducer;
