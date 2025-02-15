import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Home from '../screens/Home';
import Otp from '../screens/OTP';

const Stack = createStackNavigator();

const AppRoutes: React.FC = () => {
    return (
        <Stack.Navigator initialRouteName="splash">
            <Stack.Screen name="splash" component={Splash} />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="signup" component={Signup} />
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="otp" component={Otp} />
        </Stack.Navigator>
    );
};

export default AppRoutes;
