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

export const authenticationData = createSelector(
  selectAuthentication,
  Authentication => Authentication.token,
);
