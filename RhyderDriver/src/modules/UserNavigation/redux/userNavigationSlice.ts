import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  UserNavigationState,
  UserState,
  VehicleDetails,
} from '../../../utils/ConstantTypes/Redux';

const initialState: UserNavigationState = {
  loading: false,
  loaded: false,
  error: undefined,
  vehicleDetails: {
    make: '',
    model: '',
    year: '',
    vehiclePlateNo: '',
    vehicleType: '',
    seater: '',
    color: '',
  },
};

const userNavigationSlice = createSlice({
  name: 'userNavigation',
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
    setVehicleData: (state, action: PayloadAction<VehicleDetails>) => {
      state.vehicleDetails = action.payload;
    },
  },
});

export const {
  setUser,
  clearUser,
  userLoading,
  userLoaded,
  userError,
  setVehicleData,
} = userNavigationSlice.actions;
export default userNavigationSlice.reducer;
