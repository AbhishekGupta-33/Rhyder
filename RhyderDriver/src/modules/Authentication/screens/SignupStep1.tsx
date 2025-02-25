import React, {useEffect, useState} from 'react';
import { ImageBackground, StyleSheet, Alert} from 'react-native';
import {
  AppButton,
  AppHeader,
  AppText,
  AppTextInput,
  ButtonType,
} from '../../../components';
import {appImage} from '../../../utils/Constants';
import {useDispatch, useSelector} from 'react-redux';
import {authenticationSignupNumber, otpSendResponse} from '../redux/authSlice';
import {
  hasData,
  hasValidPhoneNumber,
  removeSpaces,
} from '../../../utils/Validators';
import {AppString} from '../../../utils/AppString';
import AuthenticationBottomView from '../components/AuthenticationBottomView';
import {authenticationLoading, otpSendResponseData} from '../redux/selector';
import {callSendOtpApi} from '../redux/thunk';
import Loader from '../../../components/AppLoader';
import { TextInput } from 'react-native-paper';

const SignupStep1: React.FC = (props: any) => {
  const dispatch = useDispatch();
  const [userSignupStep1Detail, setUserSignupStep1Detail] = useState({
    phoneNumber: '',
    phoneNumberError: '',
  });
  const otpSendSuccessResponse = useSelector(otpSendResponseData);
  const isAuthenticationLoading = useSelector(authenticationLoading);

  useEffect(() => {
    if (otpSendSuccessResponse) {
      dispatch(authenticationSignupNumber(userSignupStep1Detail.phoneNumber));
      Alert.alert(
        '',
        `${otpSendSuccessResponse}`,
        [
          {
            text: 'OK',
            onPress: () =>{ 
              props.navigation.navigate('signupVerification')
              dispatch(otpSendResponse(''));
            },
          },
        ],
      );
    }
  }, [otpSendSuccessResponse]);

  const handleSignupStep1 = async () => {
    if (!hasData(userSignupStep1Detail.phoneNumber)) {
      setUserSignupStep1Detail(prev => ({
        ...prev,
        phoneNumberError: AppString.screens.auth.signupStep1.phoneNumberError,
      }));
    } else {
      callSendOtpApi(userSignupStep1Detail.phoneNumber, dispatch);
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
      <AuthenticationBottomView bottomViewStyle={styles.container}>
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
          isLastField={true}
          leftIcon={
            <TextInput.Icon
              icon={'numeric-positive-1'}
            />
          }
          // required={true}
        />

        <AppButton
          buttonTitle={AppString.screens.auth.signupStep1.signupButton}
          onPress={handleSignupStep1}
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
      </AuthenticationBottomView>
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
