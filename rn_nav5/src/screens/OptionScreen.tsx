import React from 'react';
import { Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const OptionScreen: React.FC = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Option Screen</Text>
            <Button title="Home" onPress={() => navigation.navigate('Home')} />
            <Button
                title="Option"
                onPress={() => navigation.navigate('Option')}
            />
        </SafeAreaView>
    );
};

export default OptionScreen;
