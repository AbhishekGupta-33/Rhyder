import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AppString} from '../../utils/AppString';
import Profile from '../../modules/UserFlow/screens/Profile';

const Stack = createStackNavigator();

const ProfileNavigator: React.FC = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={AppString.NavigationScreens.user.Profile}>
      <Stack.Screen
        name={AppString.NavigationScreens.user.Profile}
        component={Profile}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
