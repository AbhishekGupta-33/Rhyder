import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import CustomButton, { ButtonType } from '../components/CustomButtons';
import { useCameraPermission } from '../hooks/useCameraPermission';

const Splash: React.FC = (props: any) => {

    const { cameraPermission, openCamera } = useCameraPermission();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to the Splash</Text>
            <CustomButton
                buttonTitle="Click"
                onPress={() => {
                    openCamera()
                }}
                buttonType={ButtonType.PRIMARY}
                buttonTitleStyle={{ color: '#ffffff' }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    text: {
        fontSize: 24,
    },
});

export default Splash;
