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
}

const AppButton: React.FC<AppButtonProps> = ({
  buttonTitle,
  onPress,
  buttonContainerStyle,
  buttonStyle,
  buttonType,
  buttonTitleStyle,
}) => {
  const PrimaryButton = () => (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#d566fc', '#ec61cd', '#fd5ea9']}>
      <Text style={[styles.primaryButtonText, buttonTitleStyle]}>
        {buttonTitle}
      </Text>
    </LinearGradient>
  );

  const SecondaryButton = () => (
    <View>
      <Text style={[styles.primaryButtonText, buttonTitleStyle]}>
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
      activeOpacity={0.9}
      style={[styles.commonButtonStyle, buttonStyle]}>
      <ButtonView />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primaryButtonText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 12,
  },
  commonButtonStyle: {
    borderRadius: 15,
    overflow: 'hidden',
    borderCurve: 'continuous', // continuous
    width: '100%',
  },
});

export default AppButton;
