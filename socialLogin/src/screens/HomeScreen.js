import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Keyboard,
    Alert,
    ImageBackground,
    Dimensions,
    Image,
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
import { useNavigation } from '@react-navigation/native';
import { Input, Tab, TabView } from '@ui-kitten/components';
import auth from '@react-native-firebase/auth';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const HomeScreen = () => {
    const [errorMsg, setErrorMsg] = useState(''); //  에러메시지
    const [confirm, setConfirm] = useState(null); //  전화번호 인증
    const [code, setCode] = useState(''); // 전화번호 코드
    const [isEmailSignUp, setIsEmailSignUp] = useState(false);
    const [emailAddress, setEmailAddress] = useState('');
    const [emailPassword, setEmailPassword] = useState('');
    const [emailConfirmPassword, setEmailConfirmPassword] = useState('');
    const [isPasswordSecure, setIsPasswordSecure] = useState(true);
    const [type, setType] = useState(0);
    const navigation = useNavigation();

    const onType = (type) => {
        // 이메일 / SMS 타입
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
                        ? onUser({
                              uid: res.accessToken,
                              platform: 'kakao',
                              expireDate:
                                  new Date(res.accessTokenExpiresAt).getTime() /
                                  1000,
                          })
                        : setErrorMsg('kakao error'),
                )
                .catch(() => setErrorMsg('kakao error'));
        }
        if (platform === 'naver') {
            //  네이버
            NaverAuth()
                .then((res) =>
                    res.accessToken
                        ? onUser({
                              uid: res.accessToken,
                              platform: 'naver',
                              expireDate: res.expiresAt,
                          })
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
            source={require('../assets/images/bg2.jpeg')}
            resizeMode="cover" // 'cover', 'contain', 'stretch', 'repeat', 'center' 중 선택
        >
            <View style={S.Container}>
                <View style={S.LogoContainer}></View>
                <View style={S.InputContainer}>
                    <TabView
                        tabBarStyle={{
                            backgroundColor: 'transparent',
                        }}
                        indicatorStyle={{
                            backgroundColor: '#fff',
                        }}
                        shouldLoadComponent={(index) => index === type}
                        selectedIndex={type}
                        onSelect={(index) => onType(index)}>
                        <Tab
                            title={() => <Text style={S.TabText}>E-MAIL</Text>}>
                            <>
                                <View style={S.SplitLayout} />
                                <Input
                                    style={S.InputStyle}
                                    value={emailAddress}
                                    label={() => (
                                        <Text style={S.InputLabelStyle}>
                                            E-mail
                                        </Text>
                                    )}
                                    placeholder={'vivoplay@vivolab.tv'}
                                    keyboardType={'email-address'}
                                    onChangeText={(text) =>
                                        setEmailAddress(text)
                                    }
                                />
                                <View style={S.SplitLayout} />
                                <Input
                                    style={S.InputStyle}
                                    value={emailPassword}
                                    label={() => (
                                        <Text style={S.InputLabelStyle}>
                                            Password
                                        </Text>
                                    )}
                                    placeholder={'********'}
                                    secureTextEntry={isPasswordSecure}
                                    accessoryRight={() => (
                                        <TouchableWithoutFeedback
                                            onPress={() =>
                                                setIsPasswordSecure(
                                                    !isPasswordSecure,
                                                )
                                            }>
                                            <Image
                                                style={{
                                                    width: 25,
                                                    height: 25,
                                                }}
                                                resizeMode="cover"
                                                source={
                                                    isPasswordSecure
                                                        ? require(`../assets/images/eye-outline.png`)
                                                        : require(`../assets/images/eye-off-outline.png`)
                                                }
                                            />
                                        </TouchableWithoutFeedback>
                                    )}
                                    onChangeText={(text) =>
                                        setEmailPassword(text)
                                    }
                                />
                                {isEmailSignUp && (
                                    <>
                                        <View style={S.SplitLayout} />
                                        <Input
                                            style={S.InputStyle}
                                            value={emailConfirmPassword}
                                            label={() => (
                                                <Text style={S.InputLabelStyle}>
                                                    Confirm Password
                                                </Text>
                                            )}
                                            placeholder={'********'}
                                            secureTextEntry={isPasswordSecure}
                                            accessoryRight={() => (
                                                <TouchableWithoutFeedback
                                                    onPress={() =>
                                                        setIsPasswordSecure(
                                                            !isPasswordSecure,
                                                        )
                                                    }>
                                                    <Image
                                                        style={{
                                                            width: 25,
                                                            height: 25,
                                                        }}
                                                        resizeMode="cover"
                                                        source={
                                                            isPasswordSecure
                                                                ? require(`../assets/images/eye-outline.png`)
                                                                : require(`../assets/images/eye-off-outline.png`)
                                                        }
                                                    />
                                                </TouchableWithoutFeedback>
                                            )}
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
                        </Tab>
                        <Tab title={() => <Text style={S.TabText}>SMS</Text>}>
                            <>
                                <View style={S.SplitLayout} />
                                <Input
                                    style={S.InputStyle}
                                    value={code}
                                    label={() => (
                                        <Text style={S.InputLabelStyle}>
                                            Code
                                        </Text>
                                    )}
                                    placeholder={'180601'}
                                    keyboardType={'numeric'}
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
                        </Tab>
                    </TabView>
                    <View style={S.ErrorLayout}>
                        <Text style={{ color: 'white', fontSize: 16 }}>
                            {errorMsg && `Message : ${errorMsg}`}
                        </Text>
                    </View>
                </View>
                <View style={{ flex: 1 }} />
                <View style={S.ButtonContainer}>
                    <View style={S.ButtonSplit}>
                        <ButtonComponent
                            value={'KAKAO'}
                            color={'#ffcd00'}
                            outline={true}
                            onPress={() => onSignIn('kakao')}
                            conatinerStyle={[S.Button, { width: 150 }]}
                        />
                        <ButtonComponent
                            value={'NAVER'}
                            color={'#3ec729'}
                            outline={true}
                            onPress={() => onSignIn('naver')}
                            conatinerStyle={[S.Button, { width: 150 }]}
                        />
                    </View>
                    <View style={S.ButtonSplit}>
                        <ButtonComponent
                            value={'GOOGLE'}
                            color={'#d93025'}
                            outline={true}
                            onPress={() => onSignIn('google')}
                            conatinerStyle={S.Button}
                        />
                        <ButtonComponent
                            value={'FACEBOOK'}
                            color={'#4267b2'}
                            outline={true}
                            onPress={() => onSignIn('facebook')}
                            conatinerStyle={S.Button}
                        />
                        <ButtonComponent
                            value={'GUEST'}
                            color={'#000'}
                            outline={true}
                            onPress={() => onSignIn('anonymous')}
                            conatinerStyle={S.Button}
                        />
                    </View>
                </View>
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
        height: 200,
        marginBottom: 10,
    },
    ButtonSplit: {
        width: '100%',
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    Button: {
        width: 95,
        height: 40,
        margin: 10,
        borderWidth: 1.2,
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
        borderColor: 'transparent',
    },
    InputLabelStyle: {
        color: '#fff',
        paddingBottom: 5,
        fontSize: 13,
    },
    TabText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
