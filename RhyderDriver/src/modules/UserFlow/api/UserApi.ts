import {ApiName} from '../../../api/apiName';
import apiClient from '../../../api/axiosInstance';

// 6. Get Profile
export const getProfile = async () => {
  try {
    const response = await apiClient.get(ApiName.auth.getProfile);
    return response.data;
  } catch (error) {
    throw error;
  }
};
