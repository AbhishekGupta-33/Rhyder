import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../modules/Splash';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './tabNavigator/TabNavigator';

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
      <Stack.Screen name="userTab" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default AppRoutes;
