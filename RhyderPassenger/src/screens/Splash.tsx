import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import CustomButton, { ButtonType } from '../components/CustomButtons';

const Splash: React.FC = (props: any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to the App</Text>
            <CustomButton
                buttonTitle="Click"
                onPress={() => {
                    props.navigation.navigate('login')
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
