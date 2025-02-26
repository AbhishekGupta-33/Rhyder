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
import {Modal, Surface} from 'react-native-paper';
import {
  authenticationSignUp,
  otpSendResponseData,
  otpVerifyResponseData,
} from '../../Authentication/redux/selector';
import {OtpInput} from 'react-native-otp-entry';
import {hasData} from '../../../utils/Validators';
import {AppString} from '../../../utils/AppString';
import {
  callSendOtpApi,
  callVerifyOtpApi,
} from '../../Authentication/redux/thunk';
import {otpVerifyResponse} from '../../Authentication/redux/authSlice';
import Icon from 'react-native-vector-icons/AntDesign';

const OtpVerification: React.FC = ({userDetail, onSuccess}) => {
  const [otpData, setOtpData] = useState({otp: '', otpError: ''});
  const {phoneNumber} = userDetail;
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const dispatch = useDispatch();
  const otpVerifySuccessResponse = useSelector(otpVerifyResponseData);
  const otpSendResponse = useSelector(otpSendResponseData);
  const [hasShownAlert, setHasShownAlert] = useState(false);

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
              onSuccess();
            }

            dispatch(otpVerifyResponse(''));
          },
        },
      ]);
    }
  }, [otpVerifySuccessResponse, hasShownAlert]);

  const handleVerify = () => {
    if (!hasData(otpData.otp) || otpData.otp.length !== 4) {
      setOtpData((prev: any) => ({
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

  return (
    <Modal visible={true} style={styles.topContainer}>
      <View style={styles.container}>
      <Icon name="closecircle"  size={24} />
        <Surface style={styles.card}>
          <AppText style={styles.subtitle}>
            {AppString.screens.auth.signupVerification.subheader}
          </AppText>
          
          <AppText style={styles.phoneNumber}>{phoneNumber}</AppText>

          <AppText style={styles.label}>
            {AppString.screens.auth.signupVerification.otpLabel}
          </AppText>

          <OtpInput
            numberOfDigits={4}
            focusColor="pink"
            autoFocus={true}
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
            buttonTitleStyle={{color: '#ffffff'}}
            buttonStyle={{marginVertical: 5}}
          />
        </Surface>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    // backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'pink',
  },
  subAppText: {
    fontSize: 14,
    color: 'black',
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    width: '90%',
    // elevation: 2,
    borderRadius: 10,
    borderCurve: 'continuous',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'left',
  },
  phoneNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 10,
  },
  resendAppText: {
    color: 'blue',
    fontSize: 14,
    paddingVertical: 10,
  },
  resendViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  disabledText: {
    color: 'gray',
  },
});

export default OtpVerification;
