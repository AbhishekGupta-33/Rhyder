import {createSelector} from 'reselect';
import {ReduxState} from '../../../utils/ConstantTypes/Redux';

export const selectAuthentication = (state: ReduxState) => state.Authentication;

export const authenticationLoaded = createSelector(
  selectAuthentication,
  Authentication => Authentication.loaded,
);
export const authenticationLoading = createSelector(
  selectAuthentication,
  Authentication => Authentication.loading,
);
export const authenticationError = createSelector(
  selectAuthentication,
  Authentication => Authentication.error,
);
export const authenticationSignUp = createSelector(
  selectAuthentication,
  Authentication => Authentication.signUpData,
);
export const authenticationLogin = createSelector(
  selectAuthentication,
  Authentication => Authentication.userData,
);

export const authenticationData = createSelector(
  selectAuthentication,
  Authentication => Authentication.token,
);

export const otpSendResponseData = createSelector(
  selectAuthentication,
  Authentication => Authentication.otpSendSuccessMessage,
);

export const otpVerifyResponseData = createSelector(
  selectAuthentication,
  Authentication => Authentication.otpVerifySuccessMessage,
);

export const signUpResponseData = createSelector(
  selectAuthentication,
  Authentication => Authentication.signupSuccessMessage,
);

export const forgetPasswordResponseData = createSelector(
  selectAuthentication,
  Authentication => Authentication.forgetPasswordSuccessMessage,
);

export const resetPasswordResponseData = createSelector(
  selectAuthentication,
  Authentication => Authentication.resetPasswordSuccessMessage,
);
