import {createSelector} from 'reselect';
import {ReduxState} from '../../../utils/ConstantTypes/Redux';

export const selectUser = (state: ReduxState) => state.Authentication;

export const userLoaded = createSelector(selectUser, User => User.loaded);
export const userLoading = createSelector(selectUser, User => User.loading);
export const userError = createSelector(selectUser, User => User.error);
