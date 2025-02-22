import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AppString} from '../../utils/AppString';
import Profile from '../../modules/UserFlow/screens/Profile';

const Stack = createStackNavigator();

const ProfileNavigator: React.FC = () => {
  //   const loginSuccessResponseData = getStorageItem(STORAGE_KEY.USER_DETAIL);
  //   const [initialRouteName, setInitialRouteName] = useState<string>(AppString.NavigationScreens.user.UploadDocuments)
  //   useLayoutEffect(() => {
  //     if (loginSuccessResponseData?.docIssue)
  //       setInitialRouteName(AppString.NavigationScreens.user.Home);
  //   }, [loginSuccessResponseData]);

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
