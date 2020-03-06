import React from 'react';
import { Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen: React.FC = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <Text>Home Screen</Text>
            <Button title="Home" onPress={() => navigation.navigate('Home')} />
            <Button
                title="Option"
                onPress={() => navigation.navigate('Option')}
            />
        </SafeAreaView>
    );
};

export default HomeScreen;
