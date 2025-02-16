import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Splash: React.FC = (props: any) => {
  useEffect(() => {
    props.navigation.navigate('auth');
  }, []);

  return (
    <LinearGradient colors={['#86E3CE', '#D0A9F5']} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>RHYDER</Text>
        <Text style={styles.tagline}>
          THE AL<Text style={styles.highlight}>TURN</Text>ATIVE ROUTE
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FF4DAB',
  },
  tagline: {
    fontSize: 16,
    color: '#000',
  },
  highlight: {
    color: '#FF4DAB',
  },
});

export default Splash;
