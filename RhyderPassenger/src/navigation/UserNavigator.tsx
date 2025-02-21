import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AppString} from '../utils/AppString';
import Home from '../modules/UserNavigation/screens/Home';

const Stack = createStackNavigator();

const UserNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={AppString.NavigationScreens.user.Home}>
      <Stack.Screen
        name={AppString.NavigationScreens.user.Home}
        component={Home}
      />
    </Stack.Navigator>
  );
};

export default UserNavigator;