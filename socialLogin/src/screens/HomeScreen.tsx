import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ButtonComponent from '../components/ButtonComponent';
import KakaoLogins from '@react-native-seoul/kakao-login';
import auth from '@react-native-firebase/auth';

const HomeScreen: React.FC = () => {
    const [accessKakao, setAccessKakao] = useState('');
    const kakaoLogin = () => {
        console.log('start');
        KakaoLogins.login()
            .then((result) => {
                console.log(result);
                setAccessKakao(result.accessToken);
            })
            .catch((err) => {
                if (err.code === 'E_CANCELLED_OPERATION') {
                    console.log(err);
                } else {
                    console.log(err);
                }
            });
    };

    useEffect(() => {
        auth()
            .createUserWithEmailAndPassword(
                'richard@tliz.co.kr',
                'SuperSecretPassword!123',
            )
            .then(() => {
                console.log('User account created & signed in!');
            })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });
    }, []);

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <View style={styles.groupButton}>
                <ButtonComponent
                    value={'Kakao Social Login'}
                    color={'#ffcd00'}
                    onPress={() => kakaoLogin()}
                />
                <View>
                    <Text>{accessKakao}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    containerView: {
        margin: 10,
    },
    groupButton: {
        margin: 5,
    },
    iconView: {
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default HomeScreen;
