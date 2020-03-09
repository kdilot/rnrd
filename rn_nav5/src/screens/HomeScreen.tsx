import React from 'react';
import { Text, Button, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen: React.FC = () => {
    const navigation = useNavigation();
    return (
        <View
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
        </View>
    );
};

export default HomeScreen;
