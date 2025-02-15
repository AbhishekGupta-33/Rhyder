import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const ForgotPassword: React.FC = (props: any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to the App</Text>
            <Button title='Click'
                onPress={() => {
                    console.log("Click");
                }}
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

export default ForgotPassword;
