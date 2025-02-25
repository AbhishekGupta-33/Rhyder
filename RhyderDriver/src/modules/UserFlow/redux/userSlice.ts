import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserState} from '../../../utils/ConstantTypes/Redux';
import {ProfileDataResponse} from '../../../utils/ConstantTypes/userTypes';

const initialState: UserState = {
  firstName: '',
  lastName: '',
  email: '',
  profilePic: null,
  loading: false,
  loaded: false,
  error: undefined,
  profileData: {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    roleId: '',
    id: '',
  },
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
    profileResponse: (state, action: PayloadAction<ProfileDataResponse>) => {
      state.profileData = action.payload;
    },
  },
});

export const {
  setUser,
  clearUser,
  userLoading,
  userLoaded,
  userError,
  profileResponse,
} = userSlice.actions;
export default userSlice.reducer;
