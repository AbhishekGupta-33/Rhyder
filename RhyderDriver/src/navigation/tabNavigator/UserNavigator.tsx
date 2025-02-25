import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AppString} from '../../utils/AppString';
import Home from '../../modules/UserNavigation/screens/Home';
import {getStorageItem, storage} from '../../utils/Storage/storage';
import {STORAGE_KEY} from '../../utils/Storage/storageKeys';
import {log} from '../../utils/Logger';
import VehicleDetails from '../../modules/UserNavigation/screens/VehicleDetails';
import VehicleDocuments from '../../modules/UserNavigation/screens/VehicleDocuments';
import DriverDocuments from '../../modules/UserNavigation/screens/DriverDocuments';

const Stack = createStackNavigator();

const UserNavigator: React.FC = () => {
  const Listener = storage.addOnValueChangedListener(changedKey => {
    setIsDocumentUploaded(storage.getString(STORAGE_KEY.USER_DETAIL)?.docIssue);
  });

  const [isDocumentUploaded, setIsDocumentUploaded] = useState<boolean>(false);

  // useEffect(() => {
  //   if (loginSuccessResponseData?.docIssue) {
  //     setIsDocumentUploaded(true);
  //   } else {
  //     setIsDocumentUploaded(false);
  //   }
  // }, [loginSuccessResponseData]);
  // log(
  //   'isDocumentUploaded----',
  //   isDocumentUploaded,
  //   loginSuccessResponseDataListener,
  // );

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {!isDocumentUploaded ? (
        <>
          <Stack.Screen
            name={AppString.NavigationScreens.user.vehicleDetails}
            component={VehicleDetails}
          />
          <Stack.Screen
            name={AppString.NavigationScreens.user.vehicleDocuments}
            component={VehicleDocuments}
          />
          <Stack.Screen
            name={AppString.NavigationScreens.user.driverDocuments}
            component={DriverDocuments}
          />
        </>
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
