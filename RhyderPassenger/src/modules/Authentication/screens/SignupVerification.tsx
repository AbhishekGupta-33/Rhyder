import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native';
import {AppButton, AppHeader, AppText, ButtonType} from '../../../components';
import {ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {Surface} from 'react-native-paper';
import {authenticationSignUp} from '../redux/selector';
import {OtpInput} from 'react-native-otp-entry';
import {hasData} from '../../../utils/Validators';
import {AppString} from '../../../utils/AppString';

const SignupVerification: React.FC = (props: any) => {
  const [otpData, setOtpData] = useState({otp: '', otpError: ''});
  const {phoneNumber} = useSelector(authenticationSignUp);

  const handleVerify = () => {
    if (!hasData(otpData.otp) || otpData.otp.length != 6) {
      setOtpData(prev => ({
        ...prev,
        otpError: AppString.screens.auth.signupVerification.otpError,
      }));
    } else {
      //call API
      props.navigation.navigate('signupStep2');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <AppText style={styles.logo}>RHYDER</AppText>
          <AppText style={styles.subAppText}>THE ALTERNATIVE ROUTE</AppText>
        </View>

        <Surface style={styles.card}>
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
            numberOfDigits={6}
            focusColor="pink"
            autoFocus={false}
            hideStick={true}
            placeholder="******"
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
            <AppText>00:30</AppText>
            <TouchableOpacity>
              <AppText style={styles.resendAppText}>
                {AppString.screens.auth.signupVerification.resendButton}
              </AppText>
            </TouchableOpacity>
          </View>

          <AppButton
            buttonTitle="Verify"
            onPress={handleVerify}
            buttonType={ButtonType.PRIMARY}
            buttonTitleStyle={{color: '#ffffff'}}
            buttonStyle={{marginVertical: 5}}
          />
        </Surface>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
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
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
});

export default SignupVerification;
