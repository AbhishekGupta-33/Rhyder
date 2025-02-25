import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../modules/Authentication/screens/Login';
import Welcome from '../modules/Authentication/screens/Welcome';
import ForgotPassword from '../modules/Authentication/screens/ForgotPassword';
import {AppString} from '../utils/AppString';
import SignupStep1 from '../modules/Authentication/screens/SignupStep1';
import SignupVerification from '../modules/Authentication/screens/SignupVerification';
import SignupStep2 from '../modules/Authentication/screens/SignupStep2';
import {useDispatch, useSelector} from 'react-redux';
import {
  authenticationError,
  authenticationLoading,
} from '../modules/Authentication/redux/selector';
import {authenticationError as AuthError} from '../modules/Authentication/redux/authSlice';
import {Alert} from 'react-native';
import Loader from '../components/AppLoader';
import CreatePassword from '../modules/Authentication/screens/CreatePassword';

const Stack = createStackNavigator();

const AuthNavigator: React.FC = () => {
  const isAuthenticationError = useSelector(authenticationError);
  const isAuthenticationLoading = useSelector(authenticationLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticationError) {
      Alert.alert('', `${isAuthenticationError}`, [
        {
          text: 'OK',
          onPress: () => dispatch(AuthError('')),
        },
      ]);
    }
  }, [isAuthenticationError]);
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={AppString.NavigationScreens.auth.Welcome}>
        <Stack.Screen
          name={AppString.NavigationScreens.auth.Welcome}
          component={Welcome}
        />
        <Stack.Screen
          name={AppString.NavigationScreens.auth.Login}
          component={Login}
        />
        <Stack.Screen
          name={AppString.NavigationScreens.auth.SignupStep1}
          component={SignupStep1}
        />
        <Stack.Screen
          name={AppString.NavigationScreens.auth.SignupStep2}
          component={SignupStep2}
        />
        <Stack.Screen
          name={AppString.NavigationScreens.auth.ForgotPassword}
          component={ForgotPassword}
        />
        <Stack.Screen
          name={AppString.NavigationScreens.auth.SignupVerification}
          component={SignupVerification}
        />
        <Stack.Screen
          name={AppString.NavigationScreens.auth.CreatePassword}
          component={CreatePassword}
        />
      </Stack.Navigator>
      <Loader loading={isAuthenticationLoading} />
    </>
  );
};

export default AuthNavigator;
