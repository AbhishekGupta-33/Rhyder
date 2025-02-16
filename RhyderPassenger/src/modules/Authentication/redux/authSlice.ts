import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  phoneNumber: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  phoneNumber: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    signup: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
    logout: state => {
      state.isAuthenticated = false;
      state.token = null;
    },
  },
});

export const {login, signup, logout} = authSlice.actions;
export default authSlice.reducer;
