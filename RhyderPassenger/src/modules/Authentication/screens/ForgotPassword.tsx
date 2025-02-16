import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {IconButton} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

const ForgotPassword: React.FC = () => {
  return (
    <LinearGradient colors={['#7ED6DF', '#A29BFE']} style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>RHYDER</Text>
        <Text style={styles.tagline}>
          THE <Text style={styles.highlight}>ALT</Text>URNATIVE ROUTE
        </Text>
      </View>

      {/* Forgot Password Card */}
      <View style={styles.card}>
        <IconButton icon="arrow-left" size={24} onPress={() => {}} />

        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>
          Change your password by entering your email or contact number
        </Text>

        <Text style={styles.label}>Email or Phone Number*</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email or Phone Number"
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Send Reset Password Link</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FF3CAC',
  },
  tagline: {
    fontSize: 14,
    color: '#000',
  },
  highlight: {
    color: '#FF3CAC',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    elevation: 5,
    alignSelf: 'flex-end',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF3CAC',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ForgotPassword;
