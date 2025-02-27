import React, {createContext, useContext, ReactNode} from 'react';
import {RefreshTokenResponse} from '../utils/ConstantTypes/authTypes';
import {getStorageItem, setStorageItem} from '../utils/Storage/storage';
import {STORAGE_KEY} from '../utils/Storage/storageKeys';
import apiClient from '../api/axiosInstance';
import {getRefreshToken} from '../modules/Authentication/api/Authapi';
import {useDispatch} from 'react-redux';
import {callLogoutApi} from '../modules/Authentication/redux/thunk';
import {ApiName} from '../api/apiName';
import {log} from '../utils/Logger';
import * as AxiosLogger from 'axios-logger';

interface AppContextType {}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({children}: {children: ReactNode}) => {
  const dispatch = useDispatch();
  // Flag to track token refresh
  let isRefreshing = false;
  let refreshSubscribers: ((token: string) => void)[] = [];

  const setTokenData = (response: RefreshTokenResponse) => {
    if (response.accessToken)
      setStorageItem(STORAGE_KEY.AUTH_TOKEN, response.accessToken);
    if (response.refreshToken)
      setStorageItem(STORAGE_KEY.AUTH_TOKEN, response.refreshToken);
  };

  // Request Interceptor (Attach token conditionally)
  apiClient.interceptors.request.use(
    async config => {
      try {
        if (
          config.url?.includes('/api/auth/') &&
          !config.url?.includes(ApiName.auth.getProfile)
        ) {
          return config;
        }

        const token = await getStorageItem(STORAGE_KEY.AUTH_TOKEN);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          log('error-----', config.headers.Authorization,config);
        }
        return AxiosLogger.requestLogger(config);
      } catch (error) {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
      }
    },
    error => Promise.reject(error),
  );

  // Response Interceptor (Handle Errors Globally)
  apiClient.interceptors.response.use(
    response => AxiosLogger.responseLogger(response),
    async error => {
      log('error-----', error.response.config.url);
      if (error.response.config.url === ApiName.auth.logout) {
        throw Promise.reject(new Error('Something went wrong'));
      }
      const originalRequest = error.config;
      if (!originalRequest)
        return Promise.reject(AxiosLogger.errorLogger(error));

      if (
        (error.response?.status === 401 || error.response?.status === 403) &&
        !originalRequest._retry
      ) {
        if (isRefreshing) {
          return new Promise(resolve => {
            refreshSubscribers.push(token => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(apiClient(originalRequest));
            });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const refreshToken = await getStorageItem(STORAGE_KEY.REFRESH_TOKEN);
          log('error-----refreshToken', refreshToken);
          if (!refreshToken) throw new Error('No refresh token available');
          log('error-----newToken-Dtartttttt');
          const response = await getRefreshToken(refreshToken);

          log('error-----newToken', response.isSuccess);
          if (!response.isSuccess) {
            log('error-----newToken-2', response.isSuccess);
            try {
              log('error-----newToken-3');
              await callLogoutApi(dispatch);
            } catch (error) {
              log('error-----newToken-3Erro');

              log('error---', error);
            }

            throw new Error(`${response.errors[0]}`);
          }
          const refreshTokenResponse = response.data;
          const accessToken = refreshTokenResponse.accessToken;
          setTokenData(refreshTokenResponse);

          apiClient.defaults.headers.Authorization = `Bearer ${accessToken}`;
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          refreshSubscribers.forEach(callback => callback(accessToken));
          refreshSubscribers = [];

          return apiClient(originalRequest);
        } catch (error) {
          console.error('Token refresh failed:', error);
        } finally {
          isRefreshing = false;
        }
      }

      console.error(
        'API Error:',
        error.response?.data || error.message || 'Unknown error',
      );
      return Promise.reject(AxiosLogger.errorLogger(error));
    },
  );

  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};
