import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import {AppButton, AppHeader, AppText, ButtonType} from '../../../components';
import {ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  authenticationSignUp,
  otpSendResponseData,
  otpVerifyResponseData,
} from '../redux/selector';
import {OtpInput} from 'react-native-otp-entry';
import {hasData} from '../../../utils/Validators';
import {AppString} from '../../../utils/AppString';
import {callSendOtpApi, callVerifyOtpApi} from '../redux/thunk';
import {otpVerifyResponse} from '../redux/authSlice';
import useTheme from '../../../hooks/useTheme';
import AuthenticationBottomView from '../components/AuthenticationBottomView';

const SignupVerification: React.FC = (props: any) => {
  const theme = useTheme();
  const [otpData, setOtpData] = useState({otp: '', otpError: ''});
  const {phoneNumber} = useSelector(authenticationSignUp);
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const dispatch = useDispatch();
  const otpVerifySuccessResponse = useSelector(otpVerifyResponseData);
  const otpSendResponse = useSelector(otpSendResponseData);
  const [hasShownAlert, setHasShownAlert] = useState(false);
  const isFrom = props?.route?.params?.isFrom;

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsResendDisabled(false);
    }
  }, [timer]);

  useEffect(() => {
    if (otpVerifySuccessResponse || hasShownAlert) {
      Alert.alert('', `${otpVerifySuccessResponse}`, [
        {
          text: 'OK',
          onPress: () => {
            if (hasShownAlert) {
              setHasShownAlert(false);
            } else {
              props.navigation.navigate(
                isFrom
                  ? AppString.NavigationScreens.auth.CreatePassword
                  : AppString.NavigationScreens.auth.SignupStep2,
              );
            }

            dispatch(otpVerifyResponse(''));
          },
        },
      ]);
    }
  }, [otpVerifySuccessResponse, hasShownAlert]);

  const handleVerify = () => {
    if (!hasData(otpData.otp) || otpData.otp.length !== 4) {
      setOtpData(prev => ({
        ...prev,
        otpError: AppString.screens.auth.signupVerification.otpError,
      }));
    } else {
      callVerifyOtpApi({phoneNumber: phoneNumber, code: otpData.otp}, dispatch);
    }
  };

  const handleResendOtp = () => {
    callSendOtpApi(phoneNumber, dispatch);
    setTimer(30);
    setIsResendDisabled(true);
    setHasShownAlert(true);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.white,
    },
    scrollView: {
      flexGrow: 1,
      justifyContent: 'flex-end',
    },
    header: {
      alignItems: 'center',
      marginBottom: theme.margin.margin_30,
    },
    logo: {
      fontSize: theme.fontSize.font_32,
      fontWeight: 'bold',
      color: theme.colors.pink,
    },
    subAppText: {
      fontSize: theme.fontSize.font_14,
      color: theme.colors.black,
    },
    subtitle: {
      fontSize: theme.fontSize.font_14,
      textAlign: 'left',
    },
    phoneNumber: {
      fontSize: theme.fontSize.font_16,
      fontWeight: 'bold',
      marginBottom: theme.margin.margin_15,
    },
    label: {
      fontSize: theme.fontSize.font_14,
      marginBottom: theme.margin.margin_10,
    },
    resendAppText: {
      color: theme.colors.blue,
      fontSize: theme.fontSize.font_14,
      paddingVertical: theme.spacing.spacing_10,
    },
    resendViewStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      marginVertical: theme.margin.margin_10,
    },
    errorText: {
      color: theme.colors.error,
      fontSize: theme.fontSize.font_14,
      marginTop: theme.margin.margin_5,
    },
    disabledText: {
      color: theme.colors.gray,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <AppText style={styles.logo}>RHYDER</AppText>
          <AppText style={styles.subAppText}>THE ALTERNATIVE ROUTE</AppText>
        </View>

        <AuthenticationBottomView>
          <AppHeader
            headerTitle={AppString.screens.auth.signupVerification.header}
            onBackPress={() => props.navigation.goBack()}
          />
          <AppText style={styles.subtitle}>
            {AppString.screens.auth.signupVerification.subheader}
          </AppText>
          <AppText style={styles.phoneNumber}>{phoneNumber}</AppText>

          <AppText style={styles.label}>
            {AppString.screens.auth.signupVerification.otpLabel}
          </AppText>

          <OtpInput
            numberOfDigits={4}
            focusColor={theme.colors.pink}
            autoFocus={false}
            hideStick={true}
            placeholder="****"
            blurOnFilled={true}
            disabled={false}
            type="numeric"
            secureTextEntry={false}
            focusStickBlinkingDuration={500}
            onFocus={() => setOtpData({...otpData, otpError: ''})}
            onTextChange={(text: string) => setOtpData({...otpData, otp: text})}
            onFilled={(text: string) => setOtpData({...otpData, otp: text})}
            textInputProps={{
              accessibilityLabel: 'One-Time Password',
            }}
          />

          {otpData.otpError ? (
            <AppText style={styles.errorText}>{otpData.otpError}</AppText>
          ) : null}

          <View style={styles.resendViewStyle}>
            <AppText>{timer < 10 ? `00:0${timer}` : `00:${timer}`}</AppText>
            <TouchableOpacity
              onPress={handleResendOtp}
              disabled={isResendDisabled}>
              <AppText
                style={[
                  styles.resendAppText,
                  isResendDisabled && styles.disabledText,
                ]}>
                {AppString.screens.auth.signupVerification.resendButton}
              </AppText>
            </TouchableOpacity>
          </View>

          <AppButton
            buttonTitle={AppString.screens.auth.signupVerification.verifyButton}
            onPress={handleVerify}
            buttonType={ButtonType.PRIMARY}
            buttonStyle={{marginVertical: theme.margin.margin_5}}
          />
        </AuthenticationBottomView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignupVerification;
