import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import AppText from './AppText';
import {removeSpaces} from '../utils/Validators';
import AppErrorText from './AppErrorText';

interface AppTextInputProps {
  label: string;
  value: string;
  onChangeText?: (text: string) => void;
  error?: string;
  required?: boolean;
  secureTextEntry?: boolean;
  placeholder?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  isLastField?: boolean;
  [key: string]: any;
}

const AppTextInput: React.FC<AppTextInputProps> = ({
  label,
  value,
  onChangeText,
  error,
  required = false,
  secureTextEntry = false,
  placeholder,
  keyboardType = 'default',
  autoCapitalize = 'none',
  isLastField = false,
  ...rest
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <AppText style={styles.label}>{required ? `${label}*` : label}</AppText>
      <TextInput
        mode="outlined"
        value={value}
        onChangeText={text => {
          if (onChangeText) onChangeText(removeSpaces(text));
        }}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        returnKeyType={isLastField ? 'done' : 'next'}
        outlineColor={error ? 'red' : '#E0E0E0'}
        activeOutlineColor={error ? 'red' : '#6200EE'}
        right={
          secureTextEntry ? (
            <TextInput.Icon
              icon={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            />
          ) : null
        }
        error={error ? true : false}
        style={styles.input}
        {...rest}
      />
      <AppErrorText>{error}</AppErrorText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'white',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default AppTextInput;
