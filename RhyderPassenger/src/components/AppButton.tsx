import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

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
  const PrimaryButton = () => (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={
        disabled ? ['#d3d3d3', '#a9a9a9'] : ['#d566fc', '#ec61cd', '#fd5ea9']
      }
      style={[styles.primaryButton, disabled && styles.disabledButtonStyle]}>
      <Text
        style={[
          styles.primaryButtonText,
          buttonTitleStyle,
          disabled && styles.disabledButtonText,
        ]}>
        {buttonTitle}
      </Text>
    </LinearGradient>
  );

  const SecondaryButton = () => (
    <View
      style={[
        styles.secondaryButton,
        disabled && styles.disabledSecondaryButtonStyle,
      ]}>
      <Text
        style={[
          styles.primaryButtonText,
          buttonTitleStyle,
          disabled && styles.disabledButtonText,
        ]}>
        {buttonTitle}
      </Text>
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
      ]}>
      <ButtonView />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primaryButton: {
    paddingVertical: 12,
    borderRadius: 15,
  },
  primaryButtonText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  secondaryButton: {
    paddingVertical: 12,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#d566fc',
  },
  commonButtonStyle: {
    borderRadius: 15,
    overflow: 'hidden',
    width: '100%',
  },
  disabledButtonStyle: {
    opacity: 0.6,
  },
  disabledButtonText: {
    color: '#808080',
  },
  disabledButtonWrapper: {
    opacity: 0.6,
  },
  disabledSecondaryButtonStyle: {
    backgroundColor: '#f0f0f0',
    borderColor: '#b0b0b0',
  },
});

export default AppButton;
