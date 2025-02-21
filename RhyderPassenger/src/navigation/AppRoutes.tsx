import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../modules/Splash';
import AuthNavigator from './AuthNavigator';
import UserNavigator from './UserNavigator';

const Stack = createStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="splash">
      <Stack.Screen name="splash" component={Splash} />
      <Stack.Screen name="auth" component={AuthNavigator} />
      <Stack.Screen name="user" component={UserNavigator} />
    </Stack.Navigator>
  );
};

export default AppRoutes;
