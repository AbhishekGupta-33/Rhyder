import {ApiName} from '../../../api/apiName';
import apiClient from '../../../api/axiosInstance';
import { changePasswordInputRequest } from '../../../utils/ConstantTypes/authTypes';

// 6. Get Profile
export const getProfile = async () => {
  try {
    const response = await apiClient.get(ApiName.auth.getProfile);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 6. Get Profile
export const changePassword = async (changePasswordInput: changePasswordInputRequest) => {
  try {
    const response = await apiClient.post(ApiName.auth.resetPassword, changePasswordInput);
    return response.data;
  } catch (error) {
    throw error;
  }
};

