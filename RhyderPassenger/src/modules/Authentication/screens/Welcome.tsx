import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppButton, AppImage, AppText, ButtonType } from '../../../components';
import { appImage } from '../../../utils/Constants';
import { AppString } from '../../../utils/AppString';

const Welcome: React.FC = (props: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <AppImage
          source={{ uri: appImage.welcome.imageUrl }}
        />
      </View>

      <View style={styles.contentContainer}>
        <AppText style={styles.heading}>{AppString.screens.auth.welcome.header1}</AppText>
        <AppText style={styles.brand}>{AppString.screens.auth.welcome.header2}</AppText>
        <AppText style={styles.description}>{AppString.screens.auth.welcome.subHedder}</AppText>

        <AppButton
          buttonTitle={AppString.screens.auth.welcome.signupButton}
          onPress={() => {
            props.navigation.navigate(AppString.NavigationScreens.auth.SignupStep1);
          }}
          buttonType={ButtonType.PRIMARY}
          buttonTitleStyle={{ color: '#ffffff' }}
          buttonStyle={{ marginVertical: 5 }}
        />

        <AppButton
          buttonTitle={AppString.screens.auth.welcome.loginButton}
          onPress={() => {
            props.navigation.navigate(AppString.NavigationScreens.auth.Login);
          }}
          buttonType={ButtonType.SECONDARY}
          buttonTitleStyle={{ color: '#C471ED' }}
          buttonStyle={{ borderColor: '#C471ED', borderWidth: 2 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#eee',
  },
  contentContainer: {
    flex: 1,
    // alignItems: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
  },
  brand: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  description: {
    color: '#666',
    marginVertical: 15,
  },
  signUpButton: {
    width: '100%',
    borderRadius: 25,
    overflow: 'hidden',
    marginVertical: 10,
  },
  gradientButton: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  signUpText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginButton: {
    borderWidth: 1,
    borderColor: '#C471ED',
    borderRadius: 25,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
  },
  loginText: {
    color: '#C471ED',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Welcome;