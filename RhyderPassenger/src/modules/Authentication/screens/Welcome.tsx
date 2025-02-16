import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AppButton, AppImage, ButtonType} from '../../../components';

const Welcome: React.FC = (props: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <AppImage
          placeholderSource={{
            uri: 'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg',
          }}
          source={{
            uri: 'https://storage.googleapis.com/support-forums-api/attachment/thread-146048858-12639125651610213305.PNG',
          }}
        />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.heading}>Let’s Ride With</Text>
        <Text style={styles.brand}>RHYDER</Text>
        <Text style={styles.description}>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </Text>

        <AppButton
          buttonTitle="Sign Up"
          onPress={() => {
            props.navigation.navigate('signup');
          }}
          buttonType={ButtonType.PRIMARY}
          buttonTitleStyle={{color: '#ffffff'}}
          buttonStyle={{marginVertical: 5}}
        />

        <AppButton
          buttonTitle="Login"
          onPress={() => {
            props.navigation.navigate('login');
          }}
          buttonType={ButtonType.SECONDARY}
          buttonTitleStyle={{color: '#C471ED'}}
          buttonStyle={{borderColor: '#C471ED', borderWidth: 2}}
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
    alignItems: 'center',
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
    textAlign: 'center',
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
