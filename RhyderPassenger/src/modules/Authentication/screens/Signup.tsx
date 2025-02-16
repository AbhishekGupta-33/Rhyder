import React, {useState} from 'react';
import {View, ImageBackground, StyleSheet, Alert} from 'react-native';
import {
  AppButton,
  AppHeader,
  AppText,
  AppTextInput,
  ButtonType,
} from '../../../components';
import {appImage} from '../../../utils/Constants';
import {useDispatch} from 'react-redux';
import {signup} from '../redux/authSlice';

const SignUp: React.FC = (props: any) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const dispatch = useDispatch();

  const handleSignUp = () => {
    if (phoneNumber.trim() === '') {
      setPhoneNumberError('Phone number is required');
      return;
    }
    Alert.alert('Success', `Signed up with phone number: ${phoneNumber}`);
    dispatch(signup(phoneNumber));
    props.navigation.navigate('otp');
  };

  return (
    <ImageBackground
      source={{uri: appImage.staticImage}}
      style={styles.background}>
      <View style={styles.container}>
        <AppHeader
          headerTitle={'Get started'}
          onBackPress={() => {
            props.navigation.goBack();
          }}
          onInfoPress={() => {
            console.log('Hello info click');
          }}
        />

        <AppTextInput
          label="Phone Number"
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={text => {
            setPhoneNumber(text);
            setPhoneNumberError('');
          }}
          error={phoneNumberError}
          required={true}
        />

        <AppButton
          buttonTitle="Sign Up"
          onPress={() => {
            handleSignUp();
          }}
          buttonType={ButtonType.PRIMARY}
          buttonTitleStyle={{color: '#ffffff'}}
          buttonStyle={{marginVertical: 5}}
        />

        <AppText style={styles.footerText}>
          Have an account?{' '}
          <AppText
            style={styles.linkText}
            onPress={() => {
              props.navigation.navigate('login');
            }}>
            Login Here
          </AppText>
        </AppText>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  footerText: {
    textAlign: 'center',
    marginTop: 10,
  },
  linkText: {
    color: '#53a1fd',
  },
});

export default SignUp;
