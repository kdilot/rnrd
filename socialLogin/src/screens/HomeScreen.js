import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { ButtonComponent } from '../components';
import {
    KaKaoAuth,
    FacebookAuth,
    GoogleAuth,
    PhoneAuth,
    NaverAuth,
    AnonymousAuth,
} from '../js/auth';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const [errorMsg, setErrorMsg] = useState(''); //  에러메시지
    const [confirm, setConfirm] = useState(null); //  전화번호 인증
    const [code, setCode] = useState(''); // 전화번호 코드
    const [isSignIn, setSignIn] = useState(true);
    const navigation = useNavigation();

    const onSignIn = (platform) => {
        // 각 소셜별 로그인 처리
        setErrorMsg('');
        if (platform === 'kakao') {
            //  카카오
            KaKaoAuth()
                .then((res) =>
                    res.accessToken
                        ? onUser({ uid: res.accessToken, platform: 'kakao' })
                        : setErrorMsg('kakao error'),
                )
                .catch(() => setErrorMsg('kakao error'));
        }
        if (platform === 'naver') {
            //  네이버
            NaverAuth()
                .then((res) =>
                    res.accessToken
                        ? onUser({ uid: res.accessToken, platform: 'naver' })
                        : setErrorMsg('naver error'),
                )
                .catch(() => setErrorMsg('naver error'));
        }
        if (platform === 'facebook') {
            //  페이스북
            FacebookAuth()
                .then(() =>
                    onUser({
                        uid: auth().currentUser.uid,
                        platform: 'facebook',
                    }),
                )
                .catch(() => setErrorMsg('facebook error'));
        }
        if (platform === 'google') {
            //  구글
            GoogleAuth()
                .then(() =>
                    onUser({
                        uid: auth().currentUser.uid,
                        platform: 'google',
                    }),
                )
                .catch((err) => setErrorMsg(err));
        }
        if (platform === 'anonymous') {
            //  익명
            AnonymousAuth()
                .then(() =>
                    onUser({
                        uid: auth().currentUser.uid,
                        platform: 'anonymous',
                    }),
                )
                .catch((err) => setErrorMsg(err));
        }
        if (platform === 'phone') {
            //  전화번호
            PhoneAuth()
                .then((res) => setConfirm(res))
                .catch(() => setErrorMsg('Phone Error'));
        }
    };

    const onUser = async (user) => {
        await AsyncStorage.setItem('user', JSON.stringify(user)).then(() => {
            navigation.replace('Main');
        });
    };

    const confirmCode = async () => {
        // PHONE 인증 코드 체크
        try {
            await confirm.confirm(code).then(() =>
                onUser({
                    uid: auth().currentUser.uid,
                    platform: 'phone',
                }),
            );
        } catch (error) {
            setErrorMsg('Invalid code.');
        }
    };

    return (
        <View style={S.Container}>
            <View style={S.ButtonLayout}>
                <>
                    <View style={S.ButtonContainer}>
                        {confirm ? (
                            <>
                                <TextInput
                                    style={S.InputStyle}
                                    value={code}
                                    onChangeText={(text) => setCode(text)}
                                />
                                <View style={S.SplitLayout} />
                                <ButtonComponent
                                    value={'Confirm Code : 180601'}
                                    color={'#8e9092'}
                                    onPress={() => confirmCode()}
                                />
                            </>
                        ) : (
                            <>
                                <ButtonComponent
                                    value={'KAKAO'}
                                    color={'#ffcd00'}
                                    onPress={() => onSignIn('kakao')}
                                />
                                <View style={S.SplitLayout} />
                                <ButtonComponent
                                    value={'NAVER'}
                                    color={'#3ec729'}
                                    onPress={() => onSignIn('naver')}
                                />
                                <View style={S.SplitLayout} />
                                <ButtonComponent
                                    value={'GOOGLE'}
                                    color={'#d93025'}
                                    onPress={() => onSignIn('google')}
                                />
                                <View style={S.SplitLayout} />
                                <ButtonComponent
                                    value={'FACEBOOK'}
                                    color={'#4267b2'}
                                    onPress={() => onSignIn('facebook')}
                                />
                                <View style={S.SplitLayout} />
                                <ButtonComponent
                                    value={'PHONE'}
                                    color={'#8e9092'}
                                    onPress={() => onSignIn('phone')}
                                />
                                <View style={S.SplitLayout} />
                                <ButtonComponent
                                    value={'ANONYMOUS'}
                                    color={'#262626'}
                                    onPress={() => onSignIn('anonymous')}
                                />
                            </>
                        )}
                    </View>
                    <View style={S.ErrorLayout}>
                        <Text>{errorMsg && `Message : ${errorMsg}`}</Text>
                    </View>
                </>
            </View>
        </View>
    );
};

const S = StyleSheet.create({
    Container: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'center',
    },
    ButtonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ButtonLayout: {
        margin: 5,
        display: 'flex',
        justifyContent: 'center',
        flex: 1,
    },
    ErrorLayout: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 20,
        margin: 10,
    },
    SplitLayout: {
        padding: 5,
    },
    InputStyle: {
        width: '100%',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 4,
    },
});

export default HomeScreen;
