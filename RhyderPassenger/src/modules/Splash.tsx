import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {AppImage} from '../components';
import {APP_IMAGE} from '../assets/png';
import {getStorageItem} from '../utils/Storage/storage';
import {STORAGE_KEY} from '../utils/Storage/storageKeys';
import {AppString} from '../utils/AppString';
import {replace} from '../utils/NavigationService';

const Splash: React.FC = (props: any) => {
  const checkUserLoggedIn = async () => {
    const userData = await getStorageItem(STORAGE_KEY.USER_DETAIL);
    const authToken = await getStorageItem(STORAGE_KEY.AUTH_TOKEN);
    if (userData && authToken) {
      replace(AppString.NavigationScreens.navigator.tab);
    } else {
      replace(AppString.NavigationScreens.stackNavigator.Auth);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      checkUserLoggedIn();
    }, 1500);
  }, []);

  return <AppImage source={APP_IMAGE.SPLASH} style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Splash;
