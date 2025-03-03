import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, ScrollView, Alert} from 'react-native';
import AuthenticationBottomView from '../components/AuthenticationBottomView';
import {
  AppButton,
  AppHeader,
  AppTextInput,
  ButtonType,
} from '../../../components';
import {AppString} from '../../../utils/AppString';
import {hasData} from '../../../utils/Validators';
import {callResetPasswordApi} from '../redux/thunk';
import {useDispatch, useSelector} from 'react-redux';
import {
  authenticationSignUp,
  resetPasswordResponseData,
} from '../redux/selector';
import useTheme from '../../../hooks/useTheme';

const CreatePassword: React.FC = (props: any) => {
  const theme = useTheme()
  const [createPasswordDetail, setCreatePasswordDetail] = useState({
    password: '',
    passwordError: '',
    confirmPassword: '',
    confirmPasswordError: '',
  });
  const dispatch = useDispatch();
  const {phoneNumber} = useSelector(authenticationSignUp);
  const resetPasswordResponse = useSelector(resetPasswordResponseData);

  useEffect(() => {
    if (resetPasswordResponse) {
      Alert.alert('', `${resetPasswordResponse}`, [
        {
          text: 'OK',
          onPress: () => {
            props.navigation.navigate(AppString.NavigationScreens.auth.Login);
          },
        },
      ]);
    }
  }, [resetPasswordResponse]);

  const handleInputChange = (fieldName: string, value: string) => {
    let error = '';
    type ErrorKeys = 'passwordError' | 'confirmPasswordError';
    if (!hasData(value)) {
      error =
        AppString.screens.auth.createPassword[`${fieldName}Error` as ErrorKeys];
    } else if (
      fieldName === 'confirmPassword' &&
      value !== createPasswordDetail.password
    ) {
      error = AppString.screens.auth.createPassword.confirmPasswordError;
    }

    setCreatePasswordDetail(prev => ({
      ...prev,
      [fieldName]: value,
      [`${fieldName}Error`]: error,
    }));
  };

  const handleCreatePassword = () => {
    let passwordError = '';
    let confirmPasswordError = '';

    if (!hasData(createPasswordDetail.password)) {
      passwordError = AppString.screens.auth.createPassword.passwordError;
    }

    if (
      !hasData(createPasswordDetail.confirmPassword) ||
      createPasswordDetail.password !== createPasswordDetail.confirmPassword
    ) {
      confirmPasswordError =
        AppString.screens.auth.createPassword.confirmPasswordError;
    }

    if (passwordError || confirmPasswordError) {
      setCreatePasswordDetail(prev => ({
        ...prev,
        passwordError,
        confirmPasswordError,
      }));
      return;
    }
    callResetPasswordApi(
      {
        identifier: phoneNumber,
        newPassword: createPasswordDetail.password,
      },
      dispatch,
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
    subheaderStyle: {
      marginBottom: theme.margin.margin_10,
      color: theme.colors.gray,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <AuthenticationBottomView>
          <AppHeader
            headerTitle={AppString.screens.auth.createPassword.header}
            onBackPress={() => {
              props.navigation.goBack();
            }}
          />

          <AppTextInput
            label={AppString.screens.auth.createPassword.passwordLabel}
            value={createPasswordDetail.password}
            onChangeText={(text: any) => {
              handleInputChange('password', text);
            }}
            placeholder={
              AppString.screens.auth.createPassword.passwordPlaceholder
            }
            error={createPasswordDetail.passwordError}
            secureTextEntry={true}
          />

          <AppTextInput
            label={AppString.screens.auth.createPassword.confirmPasswordLabel}
            value={createPasswordDetail.confirmPassword}
            onChangeText={(text: any) => {
              handleInputChange('confirmPassword', text);
            }}
            placeholder={
              AppString.screens.auth.createPassword.confirmPasswordPlaceholder
            }
            error={createPasswordDetail.confirmPasswordError}
            isLastField={true}
            secureTextEntry={true}
          />

          <AppButton
            buttonTitle={AppString.screens.auth.forgotPassword.resetButton}
            onPress={handleCreatePassword}
            buttonType={ButtonType.PRIMARY}
          />
        </AuthenticationBottomView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreatePassword;
