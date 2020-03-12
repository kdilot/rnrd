/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { StackNavigation } from '@navigations';
enableScreens();

const App: React.FC = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <NavigationContainer>
                    <StackNavigation />
                </NavigationContainer>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default App;
