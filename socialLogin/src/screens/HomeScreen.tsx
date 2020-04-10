import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { ButtonComponent } from '@components';
import KaKaoAuth from '../auth/KakaoAuth';
import FacebookAuth from '../auth/FacebookAuth';
import auth from '@react-native-firebase/auth';

const HomeScreen: React.FC = () => {
    const [accessMsg, setAccessMsg] = useState<string>('');
    const [errorMsg, setErrorMsg] = useState<string>('');
    const kakaoLogin = () => {
        KaKaoAuth().then((res: any) =>
            res.token ? setAccessMsg(res.token) : setErrorMsg(res.error),
        );
    };
    const facebookLogin = () => {
        FacebookAuth().then(() => console.log('Signed in with Facebook!'));
    };

    // useEffect(() => {
    //     auth()
    //         .createUserWithEmailAndPassword(
    //             'richard@tliz.co.kr',
    //             'SuperSecretPassword!123',
    //         )
    //         .then(() => {
    //             console.log('User account created & signed in!');
    //         })
    //         .catch((error) => {
    //             if (error.code === 'auth/email-already-in-use') {
    //                 console.log('That email address is already in use!');
    //             }

    //             if (error.code === 'auth/invalid-email') {
    //                 console.log('That email address is invalid!');
    //             }

    //             console.error(error);
    //         });
    // }, []);

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
                <Button
                    title="Facebook Sign-In"
                    onPress={() => facebookLogin()}
                />
                <View>
                    <Text>{accessMsg}</Text>
                </View>
                <View>
                    <Text>{errorMsg}</Text>
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
