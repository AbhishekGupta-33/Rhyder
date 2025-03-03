import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppText from './AppText';
import useTheme from '../hooks/useTheme';

// Enum for button types
export const ButtonType = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
};

type ButtonType = typeof ButtonType.PRIMARY | typeof ButtonType.SECONDARY;

interface AppButtonProps {
  buttonTitle: string;
  onPress: () => void;
  buttonContainerStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
  buttonType: ButtonType;
  buttonTitleStyle?: TextStyle;
  disabled?: boolean;
}

const AppButton: React.FC<AppButtonProps> = ({
  buttonTitle,
  onPress,
  buttonContainerStyle,
  buttonStyle,
  buttonType,
  buttonTitleStyle,
  disabled,
}) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    primaryButton: {},
    primaryButtonText: {
      fontSize: theme.fontSize.font_18,
      textAlign: 'center',
      fontWeight: 'bold',
      color: theme.colors.white,
      marginVertical: theme.margin.margin_12,
    },
    secondaryButton: {
      backgroundColor: theme.colors.white,
    },
    commonButtonStyle: {
      borderRadius: theme.radius.borderRadius_15,
      overflow: 'hidden',
      width: '100%',
      shadowColor: theme.colors.black,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.32,
      shadowRadius: 5.46,

      elevation: 9,
    },
    disabledButtonStyle: {
      opacity: 0.6,
    },
    disabledButtonText: {
      color: theme.colors.gray,
    },
    disabledButtonWrapper: {
      opacity: 0.6,
    },
    disabledSecondaryButtonStyle: {
      backgroundColor: theme.colors.white,
      borderColor: theme.colors.gray,
    },
  });

  const PrimaryButton = () => (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={
        disabled
          ? theme.colors.disabled_button_gradient
          : theme.colors.primary_button_gradient
      }
      style={[styles.primaryButton, disabled && styles.disabledButtonStyle]}>
      <AppText
        style={[
          styles.primaryButtonText,
          buttonTitleStyle,
          disabled && styles.disabledButtonText,
        ]}>
        {buttonTitle}
      </AppText>
    </LinearGradient>
  );

  const SecondaryButton = () => (
    <View
      style={[
        styles.secondaryButton,
        disabled && styles.disabledSecondaryButtonStyle,
      ]}>
      <AppText
        style={[
          styles.primaryButtonText,
          buttonTitleStyle,
          disabled && styles.disabledButtonText,
        ]}>
        {buttonTitle}
      </AppText>
    </View>
  );

  const ButtonView = () => {
    return buttonType === ButtonType.PRIMARY ? (
      <PrimaryButton />
    ) : buttonType === ButtonType.SECONDARY ? (
      <SecondaryButton />
    ) : null;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.9}
      style={[
        styles.commonButtonStyle,
        buttonStyle,
        disabled ? styles.disabledButtonWrapper : {},
        buttonType === ButtonType.SECONDARY && {
          borderColor: theme.colors.primary,
          borderWidth: 2,
        },
      ]}>
      <ButtonView />
    </TouchableOpacity>
  );
};
export default AppButton;
