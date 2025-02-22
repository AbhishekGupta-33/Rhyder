import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserState {
  firstName: string;
  lastName: string;
  email: string;
  profilePic: string | null;
  loading: boolean;
  loaded: boolean;
  error: Error | undefined | string;
}

const initialState: UserState = {
  firstName: '',
  lastName: '',
  email: '',
  profilePic: null,
  loading: false,
  loaded: false,
  error: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return {...state, ...action.payload};
    },
    clearUser: () => initialState,
    userLoading: state => {
      (state.loading = true), (state.loaded = false), (state.error = undefined);
    },
    userLoaded: state => {
      (state.loading = false), (state.loaded = true);
    },
    userError: (state, action: PayloadAction<Error | string>) => {
      (state.loading = false),
        (state.loaded = true),
        (state.error = action.payload);
    },
  },
});

export const {setUser, clearUser, userLoading, userLoaded, userError} =
  userSlice.actions;
export default userSlice.reducer;
