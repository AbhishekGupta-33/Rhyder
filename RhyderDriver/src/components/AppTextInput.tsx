import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import AppText from './AppText';
import {removeSpaces} from '../utils/Validators';
import AppErrorText from './AppErrorText';
import useTheme from '../hooks/useTheme';

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
  leftIcon: any;
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
  leftIcon,
  ...rest
}) => {
  const theme = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const styles = StyleSheet.create({
    container: {
      marginBottom: theme.margin.margin_5,
    },
    label: {
      fontSize: theme.fontSize.font_14,
      fontWeight: '600',
      color: theme.colors.input_label_color,
      marginBottom: theme.margin.margin_5,
    },
    input: {
      backgroundColor: theme.colors.white,
    },
    errorText: {
      color: theme.colors.error,
      fontSize: theme.fontSize.font_12,
      marginTop: theme.margin.margin_5,
    },
  });

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
        placeholderTextColor={theme.colors.gray}
        returnKeyType={isLastField ? 'done' : 'next'}
        outlineColor={
          error ? theme.colors.red : theme.colors.textInputInActiveBorder
        }
        activeOutlineColor={error ? theme.colors.red : theme.colors.primary}
        left={leftIcon}
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

export default AppTextInput;
