import React, { useState, useCallback, useMemo } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useSelector } from 'react-redux';
import {
  AppButton,
  AppHeader,
  AppModal,
  AppText,
  AppTextInput,
  ButtonType,
} from '../../../components';
import { AppString } from '../../../utils/AppString';
import { hasData, hasValidateEmail } from '../../../utils/Validators';
import { authenticationSignUp } from '../redux/selector';

const SignupStep2: React.FC = (props: any) => {
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    errors: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { phoneNumber } = useSelector(authenticationSignUp);

  const handleInputChange = useCallback((field: string, value: string) => {
    let error = '';
  
    if (!hasData(value)) {
      error = AppString.screens.auth.signupStep2[`${field}Error`];
    } else if (field === 'email' && !hasValidateEmail(value)) {
      error = AppString.screens.auth.signupStep2.emailError;
    }
  
    setUserDetails(prev => ({
      ...prev,
      [field]: value,
      errors: {
        ...prev.errors,
        [field]: error,
      },
    }));
  }, []);

  const validateEmail = useCallback((email: string) => {
    return hasValidateEmail(email) ? '' : AppString.screens.auth.signupStep2.emailError;
  }, []);

  const handleSignupStep2 = useCallback(() => {
    const { firstName, lastName, email, password } = userDetails;
    const errors = {
      firstName: hasData(firstName) ? '' : AppString.screens.auth.signupStep2.firstNameError,
      lastName: hasData(lastName) ? '' : AppString.screens.auth.signupStep2.lastNameError,
      email: hasData(email) ? validateEmail(email) : AppString.screens.auth.signupStep2.emailError,
      password: hasData(password) ? '' : AppString.screens.auth.signupStep2.passwordError,
    };

    if (!rememberMe || Object.values(errors).some(error => error !== '')) {
      setUserDetails(prev => ({ ...prev, errors }));
    } else {
      const userSignupData = {
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
      };
      console.log('userSignupData==', userSignupData);
      setShowModal(true);
    }
  }, [userDetails, phoneNumber, rememberMe, validateEmail]);

  const InputField = useMemo(() => ({ label, placeholder, value, onChangeText, error, secureTextEntry, disabled }: any) => (
    <AppTextInput
      label={label}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      error={error}
      secureTextEntry={secureTextEntry}
      disabled={disabled}
    />
  ), []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <AppHeader
            headerTitle={AppString.screens.auth.signupStep2.header}
            onBackPress={() => props.navigation.goBack()}
          />
          <AppText style={styles.subHeaderStyle}>
            {AppString.screens.auth.signupStep2.headerDescription}
          </AppText>

          <InputField
            label={AppString.screens.auth.signupStep2.firstNameLabel}
            placeholder={AppString.screens.auth.signupStep2.firstNamePlaceholder}
            value={userDetails.firstName}
            onChangeText={(text) => handleInputChange('firstName', text)}
            error={userDetails.errors.firstName}
          />
          <InputField
            label={AppString.screens.auth.signupStep2.lastNameLabel}
            placeholder={AppString.screens.auth.signupStep2.lastPlaceholder}
            value={userDetails.lastName}
            onChangeText={(text) => handleInputChange('lastName', text)}
            error={userDetails.errors.lastName}
          />
          <InputField
            label={AppString.screens.auth.signupStep2.phoneLabel}
            placeholder={AppString.screens.auth.signupStep2.phoneLabel}
            value={phoneNumber}
            disabled={true}
          />
          <InputField
            label={AppString.screens.auth.signupStep2.emailLabel}
            placeholder={AppString.screens.auth.signupStep2.emailPlaceholder}
            value={userDetails.email}
            onChangeText={(text) => handleInputChange('email', text)}
            error={userDetails.errors.email}
          />
          <InputField
            label={AppString.screens.auth.signupStep2.passwordLabel}
            placeholder={AppString.screens.auth.signupStep2.passwordPlaceholder}
            value={userDetails.password}
            onChangeText={(text) => handleInputChange('password', text)}
            error={userDetails.errors.password}
            secureTextEntry={!isPasswordVisible}
          />

          <View style={styles.rememberMe}>
            <IconButton
              icon={rememberMe ? 'checkbox-outline' : 'checkbox-blank-outline'}
              iconColor={'#FF5F9B'}
              size={20}
              onPress={() => setRememberMe(!rememberMe)}
            />
            <AppText numberOfLines={2} style={styles.confirmationText}>
              {AppString.screens.auth.signupStep2.confirmationText}
            </AppText>
          </View>
        </View>
        <AppButton
          buttonTitle={AppString.screens.auth.signupStep2.signUpButton}
          onPress={handleSignupStep2}
          buttonType={ButtonType.PRIMARY}
          buttonTitleStyle={styles.buttonTitleStyle}
          buttonStyle={styles.buttonStyle}
        />
        <AppModal
          visible={showModal}
          onCancelPress={() => setShowModal(false)}
          cancelButtonTitle="OK"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: { flexGrow: 1, paddingHorizontal: 20, backgroundColor: 'white' },
  rememberMe: { flexDirection: 'row', alignItems: 'center' },
  confirmationText: { fontSize: 14, color: '#333', maxWidth: '85%' },
  buttonTitleStyle: {
    color: 'white',
  },
  subHeaderStyle: {
    color: 'gray',
    fontSize: 12,
    marginVertical: 10,
  },
  buttonStyle: {
    marginBottom: 20,
    backgroundColor: 'red',
  },
});

export default SignupStep2;