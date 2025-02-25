import {getProfile} from '../api/UserApi';
import {profileResponse, userError, userLoaded, userLoading} from './userSlice';

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
