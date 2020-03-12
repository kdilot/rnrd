import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Test, PlayGround } from '@screens';

const Stack = createStackNavigator();
const StackNavigation: React.FC = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerTitleAlign: 'center' }}
            headerMode={'none'}>
            <Stack.Screen name="Home" component={Test} />
            <Stack.Screen name="Playground" component={PlayGround} />
        </Stack.Navigator>
    );
};

export default StackNavigation;
