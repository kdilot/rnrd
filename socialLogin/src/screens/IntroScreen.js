import React, { useEffect } from 'react';
import { ImageBackground, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

const IntroScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        AsyncStorage.getItem('user').then((user) =>
            setTimeout(() => {
                JSON.parse(user)
                    ? navigation.replace('Main')
                    : navigation.replace('SignIn');
            }, 2000),
        );
    }, []);

    return (
        <ImageBackground
            style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
                backgroundColor: '#ef4b80',
            }}
            source={require('../assets/images/logo.png')}
            resizeMode="center" // 'cover', 'contain', 'stretch', 'repeat', 'center' 중 선택
        ></ImageBackground>
    );
};

export default IntroScreen;
