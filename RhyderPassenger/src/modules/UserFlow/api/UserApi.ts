import {ApiName} from '../../../api/apiName';
import apiClient from '../../../api/axiosInstance';
import { changePasswordInputRequest } from '../../../utils/ConstantTypes/authTypes';
import { ProfileDataRequest } from '../../../utils/ConstantTypes/userTypes';
import { getStorageItem } from '../../../utils/Storage/storage';
import { STORAGE_KEY } from '../../../utils/Storage/storageKeys';

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
    const response = await apiClient.post(ApiName.auth.changePassword, changePasswordInput);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 6. Get Profile
export const editProfile = async (profileDataInput: ProfileDataRequest) => {
  try {
    const response = await apiClient.post(ApiName.auth.editProfile, profileDataInput);
    return response.data;
  } catch (error) {
    throw error;
  }
};

