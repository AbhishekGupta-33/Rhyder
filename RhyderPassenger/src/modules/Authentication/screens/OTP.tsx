import React, {useRef, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native';
import {
  AppButton,
  AppHeader,
  AppText,
  AppTextInput,
  ButtonType,
} from '../../../components';
import {ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';

const OTPVerify: React.FC = (props: any) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<Array<any>>([]);
  const phoneNumber = useSelector((state: RootState) => state.auth.phoneNumber);

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && !otp[index]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    console.log('Entered OTP:', otp.join(''));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <AppText style={styles.logo}>RHYDER</AppText>
          <AppText style={styles.subAppText}>THE ALTERNATIVE ROUTE</AppText>
        </View>

        <View style={styles.card}>
          <AppHeader
            headerTitle={'OTP Verify'}
            onBackPress={() => {
              props.navigation.navigate('login');
            }}
          />
          <AppText style={styles.subtitle}>
            Please enter the verification code sent to
          </AppText>
          <AppText style={styles.phoneNumber}>{phoneNumber}</AppText>

          <AppText style={styles.label}>Enter 6-Digits OTP</AppText>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <AppTextInput
                key={index}
                ref={(el: any) => (inputRefs.current[index] = el)}
                style={styles.otpBox}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(text: any) => handleChange(text, index)}
                onKeyPress={(e: any) => handleKeyPress(e, index)}
                autoFocus={index === 0}
                label={''}
              />
            ))}
          </View>

          <View style={styles.resendViewStyle}>
            <AppText>00:30</AppText>
            <TouchableOpacity>
              <AppText style={styles.resendAppText}>Resend OTP</AppText>
            </TouchableOpacity>
          </View>

          <AppButton
            buttonTitle="Verify"
            onPress={() => {
              handleVerify();
            }}
            buttonType={ButtonType.PRIMARY}
            buttonTitleStyle={{color: '#ffffff'}}
            buttonStyle={{marginVertical: 5}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
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
    width: '100%',
    marginTop: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    // marginTop: 40,
    // backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
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
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  otpBox: {
    width: 40,
    height: 50,
    borderWidth: 2,
    borderColor: '#d6d6d6',
    borderRadius: 8,
    fontSize: 20,
    fontWeight: 'bold',
  },
  timer: {
    fontSize: 14,
    color: 'gray',
    marginTop: 10,
  },
  resendAppText: {
    color: 'blue',
    fontSize: 14,
    paddingVertical: 10,
  },
  verifyButton: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#ff5b8f',
  },
  resendViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});

export default OTPVerify;
