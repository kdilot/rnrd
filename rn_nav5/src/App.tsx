import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const App: React.FC = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <View>
                    <Text>test page123</Text>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default App;
