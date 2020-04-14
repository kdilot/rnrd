import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '@screens';
// Before rendering any navigation stack
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
enableScreens();

const Stack = createStackNavigator();

const Routes: React.FC = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{ headerTitleAlign: 'center' }}>
                        <Stack.Screen
                            name="Social Login"
                            component={HomeScreen}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default Routes;
