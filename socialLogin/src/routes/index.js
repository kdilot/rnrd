import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, MainScreen, IntroScreen } from '../screens';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
enableScreens();

const Stack = createStackNavigator();

const Routes = () => {
    return (
        <>
            <ApplicationProvider {...eva} theme={eva.light}>
                <SafeAreaProvider>
                    <SafeAreaView style={{ flex: 1 }}>
                        <NavigationContainer>
                            <Stack.Navigator
                                screenOptions={{ headerTitleAlign: 'center' }}>
                                <Stack.Screen
                                    name="Intro"
                                    component={IntroScreen}
                                    options={{ headerShown: false }}
                                />
                                <Stack.Screen
                                    name="SignIn"
                                    component={HomeScreen}
                                    options={{ headerShown: false }}
                                />
                                <Stack.Screen
                                    name="Main"
                                    component={MainScreen}
                                />
                            </Stack.Navigator>
                        </NavigationContainer>
                    </SafeAreaView>
                </SafeAreaProvider>
            </ApplicationProvider>
        </>
    );
};

export default Routes;
