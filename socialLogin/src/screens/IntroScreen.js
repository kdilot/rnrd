import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

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
        // auth()
        //     .signInWithEmailAndPassword(
        //         'richard@tliz.co.kr',
        //         'SuperSecretPassword!',
        //     )
        //     .then((e) => {
        //         console.log(e);
        //     })
        //     .catch((error) => {
        //         if (error.code === 'auth/email-already-in-use') {
        //             console.log('That email address is already in use!');
        //         }

        //         if (error.code === 'auth/invalid-email') {
        //             console.log('That email address is invalid!');
        //         }

        //         console.log(error);
        //     });
    }, []);

    return (
        <View style={S.Container}>
            <Text style={S.IntroText}>Intro</Text>
        </View>
    );
};

const S = StyleSheet.create({
    Container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    IntroText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
});

export default IntroScreen;
