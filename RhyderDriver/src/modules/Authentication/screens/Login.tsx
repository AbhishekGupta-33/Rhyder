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
import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
  storage,
} from '../../../utils/Storage/storage';
import {STORAGE_KEY} from '../../../utils/Storage/storageKeys';
import useTheme from '../../../hooks/useTheme';

const Login: React.FC = (props: any) => {
  const theme = useTheme();
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
  const loginSuccessResponseData = useSelector(authenticationLogin);

  useEffect(() => {
    const userName = getStorageItem(STORAGE_KEY.USER_IDENTIFIER);
    if (userName) {
      setUserLoginDetail({
        ...initalUserLoginDetail,
        userName: userName,
      });
    }
  }, []);

  useEffect(() => {
    if (loginSuccessResponseData !== null && userLoginDetail.password) {
      Alert.alert('', `Login Successfully`, [
        {
          text: 'OK',
          onPress: () => {
            setUserLoginDetail(initalUserLoginDetail);
            props.navigation.replace(AppString.NavigationScreens.navigator.tab);
          },
        },
      ]);
    }
  }, [loginSuccessResponseData]);

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
      if (rememberMe)
        setStorageItem(STORAGE_KEY.USER_IDENTIFIER, `${userName}`);
      else removeStorageItem(STORAGE_KEY.USER_IDENTIFIER);
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

  const styles = StyleSheet.create({
    container: {flex: 1},
    scrollView: {flexGrow: 1, justifyContent: 'flex-end'},
    googleButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      padding: theme.spacing.spacing_12,
    },
    googleText: {
      fontSize: theme.fontSize.font_16,
      color: theme.colors.input_label_color,
    },
    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: theme.margin.margin_15,
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: theme.colors.textInputInActiveBorder,
    },
    orText: {
      marginHorizontal: theme.margin.margin_10,
      fontSize: theme.fontSize.font_14,
      color: theme.colors.gray_light,
    },
    options: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    rememberMe: {flexDirection: 'row', alignItems: 'center'},
    rememberText: {
      fontSize: theme.fontSize.font_14,
      color: theme.colors.gray_light,
    },
    forgotText: {fontSize: theme.fontSize.font_14, color: theme.colors.blue_60},
    footerText: {textAlign: 'center', marginTop: theme.margin.margin_10},
    linkText: {color: theme.colors.link},
    buttonTitleStyle: {
      color: theme.colors.purple,
    },
  });

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
                iconColor={theme.colors.pink}
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
            buttonType={ButtonType.SECONDARY}
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

export default Login;
