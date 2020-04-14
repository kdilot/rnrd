import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ButtonComponent } from '../components';
import AsyncStorage from '@react-native-community/async-storage';
import { KakaoSignOut } from '../auth/KakaoAuth';
import { NaverSignOut } from '../auth/NaverAuth';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const USER = { uid: null, platform: null };

const MainScreen = () => {
    const [user, setUser] = useState(USER);
    const navigation = useNavigation();

    const onSignOut = () => {
        // 로그아웃 카카오, 네이버 별도 처리
        if (user) {
            user.platform === 'kakao'
                ? KakaoSignOut()
                      .then(() => {
                          onUserSignOut();
                      })
                      .catch((error) => {
                          setErrorMsg(error);
                      })
                : user.platform === 'naver'
                ? (NaverSignOut(), onUserSignOut())
                : auth()
                      .signOut()
                      .then(() => {
                          onUserSignOut();
                      })
                      .catch((error) => {
                          setErrorMsg(error);
                      });
        }
    };

    const onUserSignOut = () => {
        AsyncStorage.removeItem('user').then(() => {
            setUser(USER);
            navigation.replace('SignIn');
        });
    };

    useEffect(() => {
        AsyncStorage.getItem('user').then((res) => setUser(JSON.parse(res)));
    }, []);

    return (
        <View style={S.Container}>
            <View style={S.ButtonLayout}>
                <View style={S.ButtonContainer}>
                    <ButtonComponent
                        value={'SIGN OUT'}
                        color={'black'}
                        onPress={() => onSignOut()}
                    />
                    <Text style={S.Platform}>Platform : {user.platform}</Text>
                    <View style={S.SplitLayout} />
                    <Text style={S.Uid}>{user.uid}</Text>
                </View>
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
    Platform: {
        padding: 10,
        fontSize: 16,
    },
    Uid: {
        color: 'rgba(0,0,0,0.5)',
    },
});

export default MainScreen;
