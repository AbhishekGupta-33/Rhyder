import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle, TextStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// Enum for button types
export const ButtonType = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
};

type ButtonType = typeof ButtonType.PRIMARY | typeof ButtonType.SECONDARY;

interface CustomButtonProps {
    buttonTitle: string;
    onPress: () => void;
    buttonContainerStyle?: ViewStyle;
    buttonStyle?: ViewStyle;
    buttonType: ButtonType;
    buttonTitleStyle?: TextStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({
    buttonTitle,
    onPress,
    buttonContainerStyle,
    buttonStyle,
    buttonType,
    buttonTitleStyle,
}) => {
    const PrimaryButton = () => (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#d566fc', '#ec61cd', '#fd5ea9']}
            style={[styles.commonButtonStyle, buttonStyle]}
        >
            <Text style={[styles.primaryButtonText, buttonTitleStyle]}>{buttonTitle}</Text>
        </LinearGradient>
    );

    const SecondaryButton = () => (
        <View style={[styles.commonButtonStyle, buttonStyle]}>
            <Text style={[styles.primaryButtonText, buttonTitleStyle]}>{buttonTitle}</Text>
        </View>
    );

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={[buttonContainerStyle]}>
            {buttonType === ButtonType.PRIMARY ? (
                <PrimaryButton />
            ) : buttonType === ButtonType.SECONDARY ? (
                <SecondaryButton />
            ) : null}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    primaryButtonText: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    commonButtonStyle: {
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
});

export default CustomButton;
