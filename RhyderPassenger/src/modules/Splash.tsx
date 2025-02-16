import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AppImage} from '../components';
import {APP_IMAGE} from '../assets/png';

const Splash: React.FC = (props: any) => {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('auth');
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
