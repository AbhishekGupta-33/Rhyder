import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  BackHandler,
} from 'react-native';
import {Checkbox} from 'react-native-paper';
import {
  AppButton,
  AppHeader,
  AppText,
  AppTextInput,
  ButtonType,
} from '../../../components';

const Login: React.FC = (props: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    console.log('Hello Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.card}>
          <AppHeader
            headerTitle={'Login'}
            onBackPress={() => {
              BackHandler.exitApp();
            }}
            onInfoPress={() => {
              console.log('Hello info click');
            }}
          />

          <TouchableOpacity style={styles.googleButton}>
            <AppText style={styles.googleText}>Continue With Google</AppText>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <AppText style={styles.orText}>OR</AppText>
            <View style={styles.line} />
          </View>

          <AppTextInput
            label="Email or Phone Number"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            placeholder="Enter Email or Phone Number"
            style={styles.input}
            required={true}
          />

          <AppTextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            placeholder="Enter Password"
            secureTextEntry={!isPasswordVisible}
            style={styles.input}
            required={true}
          />

          <View style={styles.options}>
            <View style={styles.rememberMe}>
              <Checkbox
                status={rememberMe ? 'checked' : 'unchecked'}
                onPress={() => setRememberMe(!rememberMe)}
                color="#FF5F9B"
              />
              <AppText style={styles.rememberText}>Remember me</AppText>
            </View>

            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('forgotPassword');
              }}>
              <AppText style={styles.forgotText}>Forgot Password?</AppText>
            </TouchableOpacity>
          </View>

          <AppButton
            buttonTitle="Login"
            onPress={() => {
              handleLogin();
            }}
            buttonType={ButtonType.PRIMARY}
            buttonTitleStyle={{color: '#ffffff'}}
            buttonStyle={{marginVertical: 5}}
          />

          <AppText style={styles.footerText}>
            Don't have an account?{' '}
            <AppText
              style={styles.linkText}
              onPress={() => {
                props.navigation.navigate('signup');
              }}>
              Sign Up
            </AppText>
          </AppText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FF5F9B',
  },
  card: {
    marginTop: 40,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 12,
    justifyContent: 'center',
    marginTop: 20,
  },
  googleText: {
    fontSize: 16,
    color: '#333',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#888',
  },
  input: {
    backgroundColor: 'white',
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    fontSize: 14,
    color: '#333',
  },
  forgotText: {
    fontSize: 14,
    color: '#007BFF',
  },
  footerText: {
    textAlign: 'center',
    marginTop: 10,
  },
  linkText: {
    color: '#53a1fd',
  },
});

export default Login;
