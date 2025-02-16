import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../modules/Splash';
import AuthNavigator from './AuthNavigator';

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
    </Stack.Navigator>
  );
};

export default AppRoutes;
