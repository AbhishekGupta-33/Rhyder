import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {AppImage} from '../components';
import {APP_IMAGE} from '../assets/png';
import {getStorageItem} from '../utils/Storage/storage';
import {STORAGE_KEY} from '../utils/Storage/storageKeys';

const Splash: React.FC = (props: any) => {
  const checkUserLoggedIn = async () => {
    const userData = await getStorageItem(STORAGE_KEY.USER_DETAIL);
    const authToken = await getStorageItem(STORAGE_KEY.AUTH_TOKEN);
    const refreshToken = await getStorageItem(STORAGE_KEY.REFRESH_TOKEN);
    if (userData && authToken && refreshToken) {
      props.navigation.navigate('user');
    } else {
      props.navigation.navigate('auth');
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
