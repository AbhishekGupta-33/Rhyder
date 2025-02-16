import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../modules/Authentication/screens/Login';
import Home from '../modules/UserNavigation/screens/Home';
import Welcome from '../modules/Authentication/screens/Welcome';
import SignUp from '../modules/Authentication/screens/Signup';
import ForgotPassword from '../modules/Authentication/screens/ForgotPassword';
import OTPVerify from '../modules/Authentication/screens/OTP';

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
      <Stack.Screen name="signup" component={SignUp} />
      <Stack.Screen name="forgotPassword" component={ForgotPassword} />
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="otp" component={OTPVerify} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
