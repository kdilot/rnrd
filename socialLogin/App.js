import React from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export default class App extends React.Component {
    render() {
        return (
            <SafeAreaProvider>
                <SafeAreaView>
                    <HomeScreen />
                </SafeAreaView>
            </SafeAreaProvider>
        );
    }
}
