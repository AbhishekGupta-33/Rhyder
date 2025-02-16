import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { IconButton } from 'react-native-paper';
import {
  AppButton,
  AppHeader,
  AppText,
  AppTextInput,
  ButtonType,
  ShadowCard,
} from '../../../components';
import {
  hasData,
  hasValidEmailOrPhoneNumber,
  removeSpaces,
} from '../../../utils/Validators';
import { AppString } from '../../../utils/AppString';

const Login: React.FC = (props: any) => {
  const [userLoginDetail, setUserLoginDetail] = useState({
    userName: '',
    userNameError: '',
    password: '',
    passwordError: '',
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    if (!hasData(userLoginDetail.userName)) {
      setUserLoginDetail(prev => ({
        ...prev,
        userNameError: AppString.screens.auth.login.emailOrPhoneError,
      }));
    } else if (!hasData(userLoginDetail.password)) {
      setUserLoginDetail(prev => ({
        ...prev,
        passwordError: AppString.screens.auth.login.passwordError,
      }));
    } else {
      // API Call Logic
    }
  };

  const fetchInfieldEmailOrPhoneNumberData = (input: string) => {
    let userNameError = hasValidEmailOrPhoneNumber(input)
      ? ''
      : AppString.screens.auth.login.emailOrPhoneError;

    setUserLoginDetail(prev => ({
      ...prev,
      userName: removeSpaces(input),
      userNameError,
    }));
  };

  const fetchInfieldPasswordData = (input: string) => {
    let passwordError = hasData(input)
      ? ''
      : AppString.screens.auth.login.passwordError;

    setUserLoginDetail(prev => ({
      ...prev,
      password: removeSpaces(input),
      passwordError,
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ShadowCard style={styles.card}>
          <AppHeader
            headerTitle={AppString.screens.auth.login.header}
            onBackPress={() => props.navigation.goBack()}
          />

          <TouchableOpacity style={styles.googleButton}>
            <AppText style={styles.googleText}>
              {AppString.screens.auth.login.googleButton}
            </AppText>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <AppText style={styles.orText}>
              {AppString.screens.auth.login.orText}
            </AppText>
            <View style={styles.line} />
          </View>

          <AppTextInput
            label={AppString.screens.auth.login.emailOrPhoneLabel}
            value={userLoginDetail.userName}
            onChangeText={fetchInfieldEmailOrPhoneNumberData}
            placeholder={AppString.screens.auth.login.emailOrPhonePlaceholder}
            error={userLoginDetail.userNameError}
          />

          <AppTextInput
            label={AppString.screens.auth.login.passwordLabel}
            value={userLoginDetail.password}
            onChangeText={fetchInfieldPasswordData}
            placeholder={AppString.screens.auth.login.passwordPlaceholder}
            secureTextEntry={!isPasswordVisible}
            error={userLoginDetail.passwordError}
          />

          <View style={styles.options}>
            <View style={styles.rememberMe}>
              <IconButton
                icon={
                  rememberMe ? 'checkbox-outline' : 'checkbox-blank-outline'
                }
                iconColor={'#FF5F9B'}
                size={20}
                onPress={() => setRememberMe(!rememberMe)}
              />
              <AppText style={styles.rememberText}>
                {AppString.screens.auth.login.rememberMe}
              </AppText>
            </View>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate(
                  AppString.screens.auth.login.forgotPasswordNavigation,
                )
              }>
              <AppText style={styles.forgotText}>
                {AppString.screens.auth.login.forgotPassword}
              </AppText>
            </TouchableOpacity>
          </View>

          <AppButton
            buttonTitle={AppString.screens.auth.login.loginButton}
            onPress={handleLogin}
            buttonType={ButtonType.PRIMARY}
          />

          <AppText style={styles.footerText}>
            {AppString.screens.auth.login.noAccount}{' '}
            <AppText
              style={styles.linkText}
              onPress={() =>
                props.navigation.navigate(
                  AppString.screens.auth.login.signupNavigation,
                )
              }>
              {AppString.screens.auth.login.signup}
            </AppText>
          </AppText>
        </ShadowCard>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flexGrow: 1, justifyContent: 'flex-end' },
  card: { marginTop: 40, backgroundColor: 'white', padding: 20 },
  googleButton: { flexDirection: 'row', justifyContent: 'center', padding: 12 },
  googleText: { fontSize: 16, color: '#333' },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  line: { flex: 1, height: 1, backgroundColor: '#E0E0E0' },
  orText: { marginHorizontal: 10, fontSize: 14, color: '#888' },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rememberMe: { flexDirection: 'row', alignItems: 'center' },
  rememberText: { fontSize: 14, color: '#333' },
  forgotText: { fontSize: 14, color: '#007BFF' },
  footerText: { textAlign: 'center', marginTop: 10 },
  linkText: { color: '#53a1fd' },
});

export default Login;
