import {Alert} from 'react-native';
import {changePasswordInputRequest} from '../../../utils/ConstantTypes/authTypes';
import {changePassword, editProfile, getProfile} from '../api/UserApi';
import {profileResponse, userError, userLoaded, userLoading} from './userSlice';
import { ProfileDataRequest } from '../../../utils/ConstantTypes/userTypes';

export const callGetProfileApi = async (dispatch: any) => {
  try {
    dispatch(userLoading());
    const response = await getProfile();
    if (response.isSuccess) {
      dispatch(profileResponse(response.data));
    } else {
      dispatch(userError(response.errors[0]));
    }
    dispatch(userLoaded());
  } catch (error) {
    dispatch(userLoaded());
    throw error;
  }
};

export const callChangePasswordApi = async (
  dispatch: any,
  changePasswordRequest: changePasswordInputRequest,
) => {
  try {
    dispatch(userLoading());
    const response = await changePassword(changePasswordRequest);
    if (response.isSuccess) {
      Alert.alert('', response.data);
    } else {
      dispatch(userError(response.errors[0]));
    }
    dispatch(userLoaded());
  } catch (error) {
    dispatch(userLoaded());
    throw error;
  }
};

export const callEditProfile = async (
  dispatch: any,
  ProfileDataInput: ProfileDataRequest,
) => {
  try {
    dispatch(userLoading());
    const response = await editProfile(ProfileDataInput);
    if (response.isSuccess) {
      Alert.alert('', response.data);
    } else {
      dispatch(userError(response.errors[0]));
    }
    dispatch(userLoaded());
  } catch (error) {
    dispatch(userLoaded());
    throw error;
  }
};
