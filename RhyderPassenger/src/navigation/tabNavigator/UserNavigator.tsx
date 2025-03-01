import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AppString} from '../../utils/AppString';
import Home from '../../modules/UserNavigation/screens/Home';
import UploadDocuments from '../../modules/UserNavigation/screens/UploadDocuments';
import {getStorageItem, storage} from '../../utils/Storage/storage';
import {STORAGE_KEY} from '../../utils/Storage/storageKeys';
import {log} from '../../utils/Logger';

const Stack = createStackNavigator();

const UserNavigator: React.FC = () => {
  const loginSuccessResponseData = getStorageItem(STORAGE_KEY.USER_DETAIL);

  const [isDocumentUploaded, setIsDocumentUploaded] = useState<boolean>(false);

  useEffect(() => {
    if (loginSuccessResponseData?.docIssue) {
      setIsDocumentUploaded(true);
    } else {
      setIsDocumentUploaded(false);
    }
  }, [loginSuccessResponseData]);
  log('');

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {!isDocumentUploaded ? (
        <Stack.Screen
          name={AppString.NavigationScreens.user.UploadDocuments}
          component={UploadDocuments}
        />
      ) : (
        <>
          <Stack.Screen
            name={AppString.NavigationScreens.user.Home}
            component={Home}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default UserNavigator;
