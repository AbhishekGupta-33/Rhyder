import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton, { ButtonType } from '../../../components/CustomButtons';

const Login: React.FC = (props: any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to the Login</Text>
            <CustomButton
                buttonTitle="Click"
                onPress={() => {
                    console.log("Hello");
                    
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
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
    },
});

export default Login;
