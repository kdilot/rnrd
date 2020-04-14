import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { ButtonComponent } from '../components';
import {
    KaKaoAuth,
    FacebookAuth,
    GoogleAuth,
    PhoneAuth,
    NaverAuth,
    AnonymousAuth,
} from '../js/auth';
import { KakaoSignOut } from '../auth/KakaoAuth';
import { NaverSignOut } from '../auth/NaverAuth';
import auth from '@react-native-firebase/auth';

const HomeScreen = () => {
    const [user, setUser] = useState(null); // 유저정보
    const [errorMsg, setErrorMsg] = useState(''); //  에러메시지
    const [confirm, setConfirm] = useState(null); //  전화번호 인증
    const [code, setCode] = useState(''); // 전화번호 코드

    const onSignIn = (platform) => {
        // 각 소셜별 로그인 처리
        setErrorMsg('');
        if (platform === 'kakao') {
            //  카카오
            KaKaoAuth()
                .then((res) =>
                    res.accessToken
                        ? setUser({ uid: res.accessToken, platform: 'kakao' })
                        : setErrorMsg('kakao error'),
                )
                .catch(() => setErrorMsg('kakao error'));
            return;
        }
        if (platform === 'naver') {
            //  네이버
            NaverAuth()
                .then((res) =>
                    res.accessToken
                        ? setUser({ uid: res.accessToken, platform: 'naver' })
                        : setErrorMsg('naver error'),
                )
                .catch(() => setErrorMsg('naver error'));
            return;
        }
        if (platform === 'facebook') {
            //  페이스북
            FacebookAuth()
                .then(() =>
                    setUser({
                        uid: auth().currentUser.uid,
                        platform: 'facebook',
                    }),
                )
                .catch(() => setErrorMsg('facebook error'));
            return;
        }
        if (platform === 'google') {
            //  구글
            GoogleAuth()
                .then(() =>
                    setUser({
                        uid: auth().currentUser.uid,
                        platform: 'google',
                    }),
                )
                .catch((err) => setErrorMsg(err));
            return;
        }
        if (platform === 'anonymous') {
            //  익명
            AnonymousAuth()
                .then(() =>
                    setUser({
                        uid: auth().currentUser.uid,
                        platform: 'anonymous',
                    }),
                )
                .catch((err) => setErrorMsg(err));
            return;
        }
        if (platform === 'phone') {
            //  전화번호
            PhoneAuth()
                .then((res) => setConfirm(res))
                .catch(() => setErrorMsg('Phone Error'));
            return;
        }
    };

    const onSignOut = () => {
        // 로그아웃 카카오, 네이버 별도 처리
        setConfirm(null);
        setCode('');
        setErrorMsg('');
        if (user) {
            user.platform === 'kakao'
                ? KakaoSignOut()
                      .then(() => {
                          setUser(null);
                      })
                      .catch((error) => {
                          setErrorMsg(error);
                      })
                : user.platform === 'naver'
                ? (NaverSignOut(), setUser(null))
                : auth()
                      .signOut()
                      .then(() => {
                          setUser(null);
                      })
                      .catch((error) => {
                          setErrorMsg(error);
                      });
        }
    };

    const confirmCode = async () => {
        // PHONE 인증 코드 체크
        try {
            await confirm.confirm(code).then(() =>
                setUser({
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
                {user ? (
                    <View style={S.ButtonContainer}>
                        <ButtonComponent
                            value={'SIGN OUT'}
                            color={'black'}
                            onPress={() => onSignOut()}
                        />
                        <View style={S.SplitLayout} />
                        <Text>{user.uid}</Text>
                    </View>
                ) : (
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
                    </>
                )}
                {!user && (
                    <View style={S.ErrorLayout}>
                        <Text>{errorMsg && `Message : ${errorMsg}`}</Text>
                    </View>
                )}
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
