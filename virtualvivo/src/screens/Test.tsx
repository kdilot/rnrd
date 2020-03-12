/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Test: React.FC = () => {
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Playground', []);
        }, 500);
    });
    return (
        <View
            style={{
                justifyContent: 'center',
                alignSelf: 'center',
                height: '100%',
            }}>
            <Text>INTRO</Text>
        </View>
    );
};

export default Test;
