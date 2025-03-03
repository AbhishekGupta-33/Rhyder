import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppButton, AppImage, AppText, ButtonType } from '../../../components';
import { appImage } from '../../../utils/Constants';
import { AppString } from '../../../utils/AppString';
import useTheme from '../../../hooks/useTheme';

const Welcome: React.FC = (props: any) => {
  const theme = useTheme()
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.white,
    },
    mapContainer: {
      flex: 1,
      backgroundColor: theme.colors.white,
    },
    contentContainer: {
      flex: 1,
      // alignItems: 'center',
      paddingHorizontal: theme.margin.margin_20,
    },
    heading: {
      fontSize: theme.fontSize.font_24,
      fontWeight: 'bold',
      color: theme.colors.black,
      marginTop: theme.margin.margin_20,
    },
    brand: {
      fontSize: theme.fontSize.font_32,
      fontWeight: 'bold',
      color: theme.colors.black,
    },
    description: {
      color: theme.colors.gray,
      marginVertical: theme.margin.margin_15,
    },
    signUpButton: {
      width: '100%',
      borderRadius: theme.radius.borderRadius_25,
      overflow: 'hidden',
      marginVertical: theme.margin.margin_10,
    },
    gradientButton: {
      paddingVertical: theme.margin.margin_15,
      alignItems: 'center',
    },
    signUpText: {
      color: theme.colors.white,
      fontWeight: 'bold',
      fontSize: theme.fontSize.font_16,
    },
    loginButton: {
      borderWidth: 1,
      borderColor: theme.colors.purple,
      borderRadius: theme.radius.borderRadius_25,
      paddingVertical: theme.spacing.spacing_15,
      width: '100%',
      alignItems: 'center',
    },
    loginText: {
      color: theme.colors.purple,
      fontWeight: 'bold',
      fontSize: theme.fontSize.font_16,
    },
  });

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
          buttonTitleStyle={{ color: theme.colors.white }}
          buttonStyle={{ marginVertical: theme.margin.margin_5 }}
        />

        <AppButton
          buttonTitle={AppString.screens.auth.welcome.loginButton}
          onPress={() => {
            props.navigation.navigate(AppString.NavigationScreens.auth.Login);
          }}
          buttonType={ButtonType.SECONDARY}
          buttonTitleStyle={{ color: theme.colors.purple }}
        />
      </View>
    </View>
  );
};

export default Welcome;