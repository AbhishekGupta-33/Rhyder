import React, { useLayoutEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AppString} from '../utils/AppString';
import Home from '../modules/UserNavigation/screens/Home';
import UploadDocuments from '../modules/UserNavigation/screens/UploadDocuments';
import { getStorageItem } from '../utils/Storage/storage';
import { STORAGE_KEY } from '../utils/Storage/storageKeys';

const Stack = createStackNavigator();

const UserNavigator: React.FC = () => {
  const loginSuccessResponseData = getStorageItem(STORAGE_KEY.USER_DETAIL);
  const [initialRouteName, setInitialRouteName] = useState<string>(AppString.NavigationScreens.user.UploadDocuments)
  useLayoutEffect(() => {
    if (loginSuccessResponseData?.docIssue)
      setInitialRouteName(AppString.NavigationScreens.user.Home);
  }, [loginSuccessResponseData]);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={initialRouteName}>
      <Stack.Screen
        name={AppString.NavigationScreens.user.Home}
        component={Home}
      />
      <Stack.Screen
        name={AppString.NavigationScreens.user.UploadDocuments}
        component={UploadDocuments}
      />
    </Stack.Navigator>
  );
};

export default UserNavigator;
