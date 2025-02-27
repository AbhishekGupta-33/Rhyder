import {configureStore, AnyAction} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {authenticationReducer} from '../modules/Authentication/redux/authSlice';
import userReducer from '../modules/UserFlow/redux/userSlice';
import userNavigationReducer from '../modules/UserNavigation/redux/userNavigationSlice';

// Creating Reducer-----------------------
const rootReducer = combineReducers({
  Authentication: authenticationReducer,
  userFlow: userReducer,
  userNavigation: userNavigationReducer,
});
export type AppState = ReturnType<typeof rootReducer>;

// Creating Store-----------------------
export const store = configureStore<AppState, AnyAction, any>({
  reducer: rootReducer,
  devTools: {
    name: 'Rhyder',
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
