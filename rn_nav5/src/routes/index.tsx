import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, OptionScreen } from '@screens';
// Before rendering any navigation stack
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
enableScreens();

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const Routes: React.FC = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                {/* <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Option" component={OptionScreen} />
            </Stack.Navigator> */}
                <Tab.Navigator>
                    <Tab.Screen name="Home" component={HomeScreen} />
                    <Tab.Screen name="Option" component={OptionScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
};

export default Routes;
