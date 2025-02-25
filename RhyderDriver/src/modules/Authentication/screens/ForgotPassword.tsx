import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, ScrollView, Alert} from 'react-native';
import AuthenticationBottomView from '../components/AuthenticationBottomView';
import {
  AppButton,
  AppHeader,
  AppText,
  AppTextInput,
  ButtonType,
} from '../../../components';
import {AppString} from '../../../utils/AppString';
import {hasData, hasValidEmailOrPhoneNumber} from '../../../utils/Validators';
import { callForgotPasswordApi } from '../redux/thunk';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPasswordResponseData } from '../redux/selector';
import { authenticationSignupNumber } from '../redux/authSlice';

const ForgotPassword: React.FC = (props: any) => {
  const [forgotPasswordDetail, setForgotPasswordDetail] = useState({
    emailOrPhoneNumber: '',
    emailOrPhoneNumberError: '',
  });
  const dispatch = useDispatch();
  const forgetPasswordResponse = useSelector(forgetPasswordResponseData)

   useEffect(() => {
      if (forgetPasswordResponse) {
        dispatch(authenticationSignupNumber(forgotPasswordDetail.emailOrPhoneNumber));
        Alert.alert(
          '',
          `${forgetPasswordResponse}`,
          [
            {
              text: 'OK',
              onPress: () => props.navigation.navigate(AppString.NavigationScreens.auth.SignupVerification,{ isFrom: 'ForgotPassword' }),
            },
          ],
        );
      }
    }, [forgetPasswordResponse]);

  const fetchInfieldEmailOrPhoneNumberData = (input: string) => {
    let emailOrPhoneNumberError = hasValidEmailOrPhoneNumber(input)
      ? ''
      : AppString.screens.auth.forgotPassword.emailOrPhoneNumberError;

    setForgotPasswordDetail(prev => ({
      ...prev,
      emailOrPhoneNumber: input,
      emailOrPhoneNumberError,
    }));
  };

  const handleForgot = () => {
    if (!hasData(forgotPasswordDetail.emailOrPhoneNumber)) {
      setForgotPasswordDetail(prev => ({
        ...prev,
        emailOrPhoneNumberError:
          AppString.screens.auth.forgotPassword.emailOrPhoneNumberError,
      }));
    } else {
      // API Call Logic
      callForgotPasswordApi(
        {identifier: forgotPasswordDetail.emailOrPhoneNumber},
        dispatch,
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <AuthenticationBottomView>
          <AppHeader
            headerTitle={AppString.screens.auth.forgotPassword.header}
            onBackPress={() => {
              props.navigation.goBack();
            }}
          />
          <AppText style={styles.subheaderStyle}>
            {AppString.screens.auth.forgotPassword.subHeader}
          </AppText>

          <AppTextInput
            label={
              AppString.screens.auth.forgotPassword.emailOrPhoneNumberLabel
            }
            value={forgotPasswordDetail.emailOrPhoneNumber}
            onChangeText={fetchInfieldEmailOrPhoneNumberData}
            placeholder={
              AppString.screens.auth.forgotPassword
                .emailOrPhoneNumberPlaceholder
            }
            error={forgotPasswordDetail.emailOrPhoneNumberError}
            isLastField={true}
          />

          <AppButton
            buttonTitle={AppString.screens.auth.forgotPassword.resetButton}
            onPress={handleForgot}
            buttonType={ButtonType.PRIMARY}
            buttonTitleStyle={styles.buttonTitleStyle}
          />
        </AuthenticationBottomView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
  },
  buttonTitleStyle: {
    color: '#ffffff',
  },
  subheaderStyle: {
    marginBottom: 10,
    color: 'gray',
  },
});

export default ForgotPassword;
