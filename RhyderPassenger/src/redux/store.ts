import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authReducer from '../modules/Authentication/redux/authSlice';
import userReducer from '../modules/UserFlow/redux/userSlice';


const rootReducer = combineReducers({
  auth: authReducer,
  userFlow: userReducer,

});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
