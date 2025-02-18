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
import {authenticationSignupNumber} from '../redux/authSlice';
import {
  hasData,
  hasValidPhoneNumber,
  removeSpaces,
} from '../../../utils/Validators';
import {AppString} from '../../../utils/AppString';

const SignupStep1: React.FC = (props: any) => {
  const dispatch = useDispatch();
  const [userSignupStep1Detail, setUserSignupStep1Detail] = useState({
    phoneNumber: '',
    phoneNumberError: '',
  });

  const handleSignupStep1 = () => {
    if (!hasData(userSignupStep1Detail.phoneNumber)) {
      setUserSignupStep1Detail(prev => ({
        ...prev,
        phoneNumberError: AppString.screens.auth.signupStep1.phoneNumberError,
      }));
    } else {
      dispatch(authenticationSignupNumber(userSignupStep1Detail.phoneNumber));
      Alert.alert(
        'Success',
        `OTP sent on phone number: ${userSignupStep1Detail.phoneNumber}`,
      );
      props.navigation.navigate('signupVerification');
      // API Call Logic
    }
  };

  const fetchInputfieldPhoneNumberData = (input: string) => {
    let phoneNumberError = hasValidPhoneNumber(input)
      ? ''
      : AppString.screens.auth.signupStep1.phoneNumberError;

    setUserSignupStep1Detail(prev => ({
      ...prev,
      phoneNumber: removeSpaces(input),
      phoneNumberError,
    }));
  };

  return (
    <ImageBackground
      source={{uri: appImage.staticImage}}
      style={styles.background}>
      <View style={styles.container}>
        <AppHeader
          headerTitle={AppString.screens.auth.signupStep1.header}
          onBackPress={() => {
            props.navigation.goBack();
          }}
          onInfoPress={() => {
            console.log('Hello info click');
          }}
        />

        <AppTextInput
          label={AppString.screens.auth.signupStep1.phoneNumberLabel}
          placeholder={
            AppString.screens.auth.signupStep1.phoneNumberPlaceholder
          }
          value={userSignupStep1Detail.phoneNumber}
          onChangeText={fetchInputfieldPhoneNumberData}
          error={userSignupStep1Detail.phoneNumberError}
          // required={true}
        />

        <AppButton
          buttonTitle={AppString.screens.auth.signupStep1.signupButton}
          onPress={() => {
            handleSignupStep1();
          }}
          buttonType={ButtonType.PRIMARY}
          buttonTitleStyle={{color: '#ffffff'}}
          buttonStyle={{marginVertical: 5}}
        />

        <AppText style={styles.footerText}>
          {AppString.screens.auth.signupStep1.haveAccount}
          <AppText
            style={styles.linkText}
            onPress={() => {
              props.navigation.navigate('login');
            }}>
            {AppString.screens.auth.signupStep1.loginButton}
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

export default SignupStep1;
