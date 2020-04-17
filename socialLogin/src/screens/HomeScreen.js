import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Keyboard,
    Alert,
    ImageBackground,
    Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { ButtonComponent, TabComponent } from '../js/components';
import {
    KaKaoAuth,
    FacebookAuth,
    GoogleAuth,
    PhoneAuth,
    NaverAuth,
    AnonymousAuth,
    EmailAuth,
} from '../js/auth';
import { EmailSignUp } from '../js/auth/EmailAuth';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const [errorMsg, setErrorMsg] = useState(''); //  에러메시지
    const [confirm, setConfirm] = useState(null); //  전화번호 인증
    const [code, setCode] = useState(''); // 전화번호 코드
    const [isEmailSignUp, setIsEmailSignUp] = useState(false);
    const [emailAddress, setEmailAddress] = useState('');
    const [emailPassword, setEmailPassword] = useState('');
    const [emailConfirmPassword, setEmailConfirmPassword] = useState('');
    const [type, setType] = useState(0);
    const navigation = useNavigation();

    const onType = (type) => {
        setType(type);
        setErrorMsg('');
    };

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
        if (platform === 'email') {
            //  이메일
            if ((emailAddress, emailPassword)) {
                if (isEmailSignUp) {
                    // 이메일 회원가입
                    if (
                        !emailPassword.trim() ||
                        emailPassword !== emailConfirmPassword
                    ) {
                        Alert.alert('비밀번호를 확인해주세요.');
                        return;
                    }
                    EmailSignUp(emailAddress, emailPassword)
                        .then((res) =>
                            res.rs === true
                                ? (setErrorMsg(res.msg),
                                  onPressSignButton(false))
                                : setErrorMsg(res.error),
                        )
                        .catch((e) => setErrorMsg(e));
                } else {
                    // 이메일 로그인
                    EmailAuth(emailAddress, emailPassword)
                        .then((res) =>
                            res.uid
                                ? onUser({
                                      uid: auth().currentUser.uid,
                                      platform: 'email',
                                  })
                                : setErrorMsg(res.error),
                        )
                        .catch((e) => setErrorMsg(e));
                }
                Keyboard.dismiss();
            } else {
                Alert.alert('입력 값을 확인해주세요.');
            }
        }
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
        Keyboard.dismiss();
    };

    const onUser = async (user) => {
        // User 정보 저장
        await AsyncStorage.setItem('user', JSON.stringify(user)).then(() => {
            navigation.replace('Main');
        });
    };

    const onPressSignButton = (type) => {
        // 이메일 가입 / 로그인 타입
        setEmailAddress('');
        setEmailPassword('');
        setEmailConfirmPassword('');
        setIsEmailSignUp(type);
    };

    useEffect(() => {
        if (type === 1 && !confirm) {
            onSignIn('phone');
        }
    }, [type]);

    return (
        <ImageBackground
            style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
            }}
            source={require('../assets/images/bg.jpeg')}
            resizeMode="cover" // 'cover', 'contain', 'stretch', 'repeat', 'center' 중 선택
        >
            <View style={S.Container}>
                <View style={S.LogoContainer}></View>
                <View style={S.InputContainer}>
                    <TabComponent type={type} onClick={(e) => onType(e)} />
                    <View>
                        {confirm && type === 1 ? (
                            <>
                                <TextInput
                                    style={S.InputStyle}
                                    value={code}
                                    placeholder={'Code : ******'}
                                    secureTextEntry={true}
                                    keyboardType={'numeric'}
                                    placeholderTextColor={
                                        'rgba(255,255,255,0.8)'
                                    }
                                    onChangeText={(text) => setCode(text)}
                                />
                                <View style={S.SplitLayout} />
                                <ButtonComponent
                                    value={'CODE : 180601'}
                                    color={'#fff'}
                                    disabled={code ? false : true}
                                    textStyle={{ color: '#000' }}
                                    onPress={() => confirmCode()}
                                />
                            </>
                        ) : (
                            <>
                                <TextInput
                                    style={S.InputStyle}
                                    value={emailAddress}
                                    placeholder={'Email'}
                                    keyboardType={'email-address'}
                                    placeholderTextColor={
                                        'rgba(255,255,255,0.8)'
                                    }
                                    onChangeText={(text) =>
                                        setEmailAddress(text)
                                    }
                                />
                                <View style={S.SplitLayout} />
                                <TextInput
                                    style={S.InputStyle}
                                    value={emailPassword}
                                    placeholder={'Password'}
                                    secureTextEntry={true}
                                    placeholderTextColor={
                                        'rgba(255,255,255,0.8)'
                                    }
                                    onChangeText={(text) =>
                                        setEmailPassword(text)
                                    }
                                />
                                {isEmailSignUp && (
                                    <>
                                        <View style={S.SplitLayout} />
                                        <TextInput
                                            style={S.InputStyle}
                                            value={emailConfirmPassword}
                                            placeholder={'Confirm Password'}
                                            secureTextEntry={true}
                                            placeholderTextColor={
                                                'rgba(255,255,255,0.8)'
                                            }
                                            onChangeText={(text) =>
                                                setEmailConfirmPassword(text)
                                            }
                                        />
                                    </>
                                )}
                                <View style={S.SplitLayout} />
                                <View style={S.EmailButtonGroup}>
                                    {isEmailSignUp ? (
                                        <>
                                            <ButtonComponent
                                                value={'Sign In'}
                                                color={'#fff'}
                                                outline={true}
                                                onPress={() =>
                                                    onPressSignButton(false)
                                                }
                                                conatinerStyle={{ flex: 1 }}
                                            />
                                            <View style={S.SplitLayout} />
                                            <ButtonComponent
                                                value={'Sign Up'}
                                                color={'#fff'}
                                                disabled={
                                                    emailAddress &&
                                                    emailPassword
                                                        ? false
                                                        : true
                                                }
                                                onPress={() =>
                                                    onSignIn('email')
                                                }
                                                textStyle={{ color: '#000' }}
                                                conatinerStyle={{ flex: 1 }}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <ButtonComponent
                                                value={'Sign Up'}
                                                color={'#fff'}
                                                outline={true}
                                                onPress={() =>
                                                    onPressSignButton(true)
                                                }
                                                conatinerStyle={{ flex: 1 }}
                                            />
                                            <View style={S.SplitLayout} />
                                            <ButtonComponent
                                                value={'Sign In'}
                                                color={'#fff'}
                                                disabled={
                                                    emailAddress &&
                                                    emailPassword
                                                        ? false
                                                        : true
                                                }
                                                onPress={() =>
                                                    onSignIn('email')
                                                }
                                                textStyle={{ color: '#000' }}
                                                conatinerStyle={{ flex: 1 }}
                                            />
                                        </>
                                    )}
                                </View>
                            </>
                        )}
                    </View>
                    <View style={S.ErrorLayout}>
                        <Text style={{ color: 'rgba(255,0,0,0.7)' }}>
                            {errorMsg && `Message : ${errorMsg}`}
                        </Text>
                    </View>
                </View>
                <View style={S.ButtonContainer}>
                    <View style={S.ButtonSplit}>
                        <ButtonComponent
                            value={'KAKAO'}
                            color={'#ffcd00'}
                            onPress={() => onSignIn('kakao')}
                            conatinerStyle={[S.Button, { width: 100 }]}
                        />
                        <ButtonComponent
                            value={'NAVER'}
                            color={'#3ec729'}
                            onPress={() => onSignIn('naver')}
                            conatinerStyle={[S.Button, { width: 100 }]}
                        />
                    </View>
                    <View style={S.ButtonSplit}>
                        <ButtonComponent
                            value={'G'}
                            color={'#d93025'}
                            onPress={() => onSignIn('google')}
                            conatinerStyle={S.Button}
                        />
                        <ButtonComponent
                            value={'F'}
                            color={'#4267b2'}
                            onPress={() => onSignIn('facebook')}
                            conatinerStyle={S.Button}
                        />
                        <ButtonComponent
                            value={'A'}
                            color={'#262626'}
                            onPress={() => onSignIn('anonymous')}
                            conatinerStyle={S.Button}
                        />
                    </View>
                </View>
                <View style={{ flex: 1 }} />
            </View>
        </ImageBackground>
    );
};

const S = StyleSheet.create({
    Container: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    },
    LogoContainer: {
        height: 200,
        justifyContent: 'center',
        alignContent: 'center',
    },
    LogoText: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: '#f83296',
    },
    InputContainer: {
        height: 300,
    },
    ButtonContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 130,
        marginBottom: 10,
    },
    ButtonSplit: {
        width: '100%',
        paddingHorizontal: 40,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    Button: {
        width: 60,
        height: 40,
        margin: 10,
    },
    EmailButtonGroup: {
        flexDirection: 'row',
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
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 4,
        color: 'white',
        paddingHorizontal: 10,
    },
});

export default HomeScreen;
