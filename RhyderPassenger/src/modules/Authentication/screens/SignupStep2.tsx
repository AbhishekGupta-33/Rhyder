import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {
  AppButton,
  AppHeader,
  AppModal,
  AppText,
  AppTextInput,
  ButtonType,
} from '../../../components';
import {AppString} from '../../../utils/AppString';
import {
  hasData,
  hasValidEmailOrPhoneNumber,
  removeSpaces,
} from '../../../utils/Validators';
import {IconButton} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {authenticationSignUp} from '../redux/selector';

const SignupStep2: React.FC = (props: any) => {
  const [userSignupStep2Detail, setUserSignupStep2Detail] = useState({
    firstName: '',
    firstNameError: '',
    lastName: '',
    lastNameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {phoneNumber} = useSelector(authenticationSignUp);
  const [showModal, setShowModal] = useState(false);

  const fetchInputFieldFirstNameData = (input: string) => {
    let fristNameError = hasData(input)
      ? ''
      : AppString.screens.auth.signupStep2.firstNameError;

    setUserSignupStep2Detail(prev => ({
      ...prev,
      firstName: removeSpaces(input),
      fristNameError,
    }));
  };

  const fetchInputFieldLastNameData = (input: string) => {
    let lastNameError = hasData(input)
      ? ''
      : AppString.screens.auth.signupStep2.lastNameError;

    setUserSignupStep2Detail(prev => ({
      ...prev,
      lastName: removeSpaces(input),
      lastNameError,
    }));
  };

  const fetchInputFieldEmailData = (input: string) => {
    let emailError = hasValidEmailOrPhoneNumber(input)
      ? ''
      : AppString.screens.auth.signupStep2.emailError;

    setUserSignupStep2Detail(prev => ({
      ...prev,
      email: removeSpaces(input),
      emailError,
    }));
  };

  const fetchInputFieldPasswordData = (input: string) => {
    let passwordError = hasData(input)
      ? ''
      : AppString.screens.auth.signupStep2.passwordError;

    setUserSignupStep2Detail(prev => ({
      ...prev,
      password: removeSpaces(input),
      passwordError,
    }));
  };

  const handleSignupStep2 = () => {
    if (!hasData(userSignupStep2Detail.firstName)) {
      setUserSignupStep2Detail(prev => ({
        ...prev,
        firstNameError: AppString.screens.auth.signupStep2.firstNameError,
      }));
    } else if (!hasData(userSignupStep2Detail.lastName)) {
      setUserSignupStep2Detail(prev => ({
        ...prev,
        lastNameError: AppString.screens.auth.signupStep2.lastNameError,
      }));
    } else if (!hasData(userSignupStep2Detail.email)) {
      setUserSignupStep2Detail(prev => ({
        ...prev,
        emailError: AppString.screens.auth.signupStep2.emailError,
      }));
    } else if (!hasData(userSignupStep2Detail.password)) {
      setUserSignupStep2Detail(prev => ({
        ...prev,
        passwordError: AppString.screens.auth.signupStep2.passwordError,
      }));
    } else {
      // API Call Logic
      let userSignupData = {
        firstName: userSignupStep2Detail.firstName,
        lastName: userSignupStep2Detail.lastName,
        phoneNumber: phoneNumber,
        email: userSignupStep2Detail.email,
        password: userSignupStep2Detail.password,
        isWomen: rememberMe,
      };
      console.log('userSignupData==', userSignupData);
      setShowModal(true);
    }
  };

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

          <AppTextInput
            label={AppString.screens.auth.signupStep2.firstNameLabel}
            placeholder={
              AppString.screens.auth.signupStep2.firstNamePlaceholder
            }
            value={userSignupStep2Detail.firstName}
            onChangeText={fetchInputFieldFirstNameData}
            error={userSignupStep2Detail.firstNameError}
          />
          <AppTextInput
            label={AppString.screens.auth.signupStep2.lastNameLabel}
            placeholder={AppString.screens.auth.signupStep2.lastPlaceholder}
            value={userSignupStep2Detail.lastName}
            onChangeText={fetchInputFieldLastNameData}
            error={userSignupStep2Detail.lastNameError}
          />
          <AppTextInput
            label={AppString.screens.auth.signupStep2.phoneLabel}
            placeholder={AppString.screens.auth.signupStep2.phoneLabel}
            value={phoneNumber}
            disabled={true}
            // onChangeText={fetchInputFieldPhoneNumberData}
            // error={userSignupStep2Detail.phoneNumberError}
          />
          <AppTextInput
            label={AppString.screens.auth.signupStep2.emailLabel}
            placeholder={AppString.screens.auth.signupStep2.emailPlaceholder}
            value={userSignupStep2Detail.email}
            onChangeText={fetchInputFieldEmailData}
            error={userSignupStep2Detail.emailError}
          />
          <AppTextInput
            label={AppString.screens.auth.signupStep2.passwordLabel}
            placeholder={AppString.screens.auth.signupStep2.passwordPlaceholder}
            value={userSignupStep2Detail.password}
            onChangeText={fetchInputFieldPasswordData}
            error={userSignupStep2Detail.passwordError}
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
          onCancelPress={() => {
            setShowModal(false);
          }}
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
  scrollView: {flexGrow: 1, paddingHorizontal: 20, backgroundColor: 'white'},
  rememberMe: {flexDirection: 'row', alignItems: 'center'},
  confirmationText: {fontSize: 14, color: '#333', maxWidth: '85%'},
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
