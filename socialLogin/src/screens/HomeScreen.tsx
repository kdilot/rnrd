import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ButtonComponent } from '@components';
import { KaKaoAuth, FacebookAuth, GoogleAuth, PhoneAuth } from '@auth';
import { KakaoLogout } from '../auth/KakaoAuth';
import auth from '@react-native-firebase/auth';
import { TextInput } from 'react-native-gesture-handler';
import Anonymous from 'src/auth/AnonymousAuth';

const HomeScreen: React.FC = () => {
    const [user, setUser] = useState<any>('');
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState('');

    const onSignIn = (platform: string) => {
        // 각 소셜별 로그인 처리
        setErrorMsg('');
        if (platform === 'kakao') {
            KaKaoAuth().then((res: any) =>
                res.accessToken
                    ? setUser({ uid: res.accessToken, platform: 'kakao' })
                    : console.log(res),
            );
            return;
        }
        if (platform === 'facebook') {
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
            Anonymous()
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
            PhoneAuth()
                .then((res: any) => setConfirm(res))
                .catch(() => setErrorMsg('Phone Error'));
            return;
        }
    };

    const onSignOut = () => {
        // 로그아웃 카카오만 별도 처리
        setConfirm(null);
        setCode('');
        setErrorMsg('');
        if (user) {
            user.platform === 'kakao'
                ? KakaoLogout()
                      .then(() => {
                          setUser('');
                      })
                      .catch((error) => {
                          setErrorMsg(error);
                      })
                : auth()
                      .signOut()
                      .then(() => {
                          setUser('');
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
                                        style={{
                                            width: '100%',
                                            backgroundColor: 'lightyellow',
                                        }}
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
                        <Text>{errorMsg && `ERROR : ${errorMsg}`}</Text>
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
});

export default HomeScreen;
