import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import {IconButton} from 'react-native-paper';
import {
  AppButton,
  AppHeader,
  AppText,
  AppTextInput,
  ButtonType,
  ShadowCard,
} from '../../../components';
import {hasData, hasValidEmailOrPhoneNumber} from '../../../utils/Validators';
import {AppString} from '../../../utils/AppString';
import {callLoginApi} from '../redux/thunk';
import {useDispatch, useSelector} from 'react-redux';
import {authenticationLogin} from '../redux/selector';
import AuthenticationBottomView from '../components/AuthenticationBottomView';

const Login: React.FC = (props: any) => {
  // State ------------------------------------------------
  const initalUserLoginDetail = {
    userName: '',
    password: '',
    errors: {
      userName: '',
      password: '',
    },
  };
  const [userLoginDetail, setUserLoginDetail] = useState(initalUserLoginDetail);
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const loginResponseData = useSelector(authenticationLogin);

  useEffect(() => {
    if (loginResponseData !== null) {
      Alert.alert('', `Login Success Fully`, [
        {
          text: 'OK',
          onPress: () => {
            setUserLoginDetail(initalUserLoginDetail);
            props.navigation.navigate(
              AppString.NavigationScreens.auth.UploadDocuments,
            );
          },
        },
      ]);
    }
  }, [loginResponseData]);

  // Functionality ------------------------------------------------
  const handleInputChange = useCallback((field: string, value: string) => {
    let error = '';

    if (!hasData(value)) {
      error = (AppString.screens.auth.login as Record<string, string>)[
        `${field}Error`
      ];
    } else if (field === 'userName' && !hasValidEmailOrPhoneNumber(value)) {
      error = AppString.screens.auth.login.emailOrPhoneError;
    }
    console.log(error);

    setUserLoginDetail(prev => ({
      ...prev,
      [field]: value,
      errors: {
        ...prev.errors,
        [field]: error,
      },
    }));
  }, []);

  const handleLogin = useCallback(() => {
    const {userName, password} = userLoginDetail;
    const errors = {
      userName: hasData(userName)
        ? ''
        : AppString.screens.auth.login.emailOrPhoneError,
      password: hasData(password)
        ? ''
        : AppString.screens.auth.login.passwordError,
    };

    if (Object.values(errors).some(error => error !== '')) {
      setUserLoginDetail(prev => ({...prev, errors}));
    } else {
      // API Call Logic
      callLoginApi(
        {
          identifier: userName,
          password: password,
        },
        dispatch,
      );
    }
  }, [
    userLoginDetail,
    userLoginDetail.userName,
    userLoginDetail.password,
    rememberMe,
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <AuthenticationBottomView>
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
            onChangeText={text => handleInputChange('userName', text)}
            placeholder={AppString.screens.auth.login.emailOrPhonePlaceholder}
            error={userLoginDetail.errors.userName}
          />

          <AppTextInput
            label={AppString.screens.auth.login.passwordLabel}
            value={userLoginDetail.password}
            onChangeText={text => handleInputChange('password', text)}
            placeholder={AppString.screens.auth.login.passwordPlaceholder}
            secureTextEntry={true}
            error={userLoginDetail.errors.password}
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
            buttonTitleStyle={styles.buttonTitleStyle}
          />

          <AppText style={styles.footerText}>
            {AppString.screens.auth.login.noAccount}{' '}
            <AppText
              style={styles.linkText}
              onPress={() =>
                props.navigation.navigate(
                  AppString.NavigationScreens.auth.SignupStep1,
                )
              }>
              {AppString.screens.auth.login.signup}
            </AppText>
          </AppText>
        </AuthenticationBottomView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  scrollView: {flexGrow: 1, justifyContent: 'flex-end'},
  googleButton: {flexDirection: 'row', justifyContent: 'center', padding: 12},
  googleText: {fontSize: 16, color: '#333'},
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  line: {flex: 1, height: 1, backgroundColor: '#E0E0E0'},
  orText: {marginHorizontal: 10, fontSize: 14, color: '#888'},
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rememberMe: {flexDirection: 'row', alignItems: 'center'},
  rememberText: {fontSize: 14, color: '#333'},
  forgotText: {fontSize: 14, color: '#007BFF'},
  footerText: {textAlign: 'center', marginTop: 10},
  linkText: {color: '#53a1fd'},
  buttonTitleStyle: {
    color: '#ffffff',
  },
});

export default Login;
