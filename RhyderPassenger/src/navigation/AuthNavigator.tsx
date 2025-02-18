import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../modules/Authentication/screens/Login';
import Home from '../modules/UserNavigation/screens/Home';
import Welcome from '../modules/Authentication/screens/Welcome';
import ForgotPassword from '../modules/Authentication/screens/ForgotPassword';
import SignupStep1 from '../modules/Authentication/screens/SignupStep1';
import SignupVerification from '../modules/Authentication/screens/SignupVerification';
import SignupStep2 from '../modules/Authentication/screens/SignupStep2';
import UploadDocuments from '../modules/Authentication/screens/UploadDocuments';
import { AppString } from '../utils/AppString';

const Stack = createStackNavigator();

const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="welcome">
      <Stack.Screen name="welcome" component={Welcome} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signupStep1" component={SignupStep1} />
      <Stack.Screen name="signupStep2" component={SignupStep2} />
      <Stack.Screen name="forgotPassword" component={ForgotPassword} />
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="signupVerification" component={SignupVerification} />
      <Stack.Screen name={AppString.NavigationScreens.auth.UploadDocuments} component={UploadDocuments}/>
    </Stack.Navigator>
  );
};

export default AuthNavigator;
