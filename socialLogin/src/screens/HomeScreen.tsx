import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ButtonComponent } from '@components';
import { KaKaoAuth, FacebookAuth, GoogleAuth } from '@auth';
import auth from '@react-native-firebase/auth';

const HomeScreen: React.FC = () => {
    const [user, setUser] = useState('');
    const [accessMsg, setAccessMsg] = useState<string>('');
    const [errorMsg, setErrorMsg] = useState<string>('');
    const kakaoLogin = () => {
        setErrorMsg('');
        KaKaoAuth().then((res: any) =>
            res.token ? setAccessMsg(res.token) : setErrorMsg(res.error),
        );
    };
    const facebookLogin = () => {
        setErrorMsg('');
        FacebookAuth().then((res: any) => console.log(auth().currentUser));
    };
    const googleLogin = () => {
        setErrorMsg('');
        GoogleAuth()
            .then((res: any) => console.log(auth().currentUser))
            .catch((e) => setErrorMsg('Error'));
    };

    const onSignOut = () => {
        auth()
            .signOut()
            .then((res) => {
                setUser('');
            })
            .catch((error) => {
                setErrorMsg(error);
            });
    };

    return (
        <View style={styles.Container}>
            <View style={styles.ButtonLayout}>
                {user ? (
                    <View style={styles.ButtonContainer}>
                        <ButtonComponent
                            value={'SIGN OUT'}
                            color={'black'}
                            onPress={() => onSignOut()}
                        />
                    </View>
                ) : (
                    <>
                        <View style={styles.ButtonContainer}>
                            <ButtonComponent
                                value={'KAKAO'}
                                color={'#ffcd00'}
                                onPress={() => kakaoLogin()}
                            />
                            <View style={{ padding: 5 }} />
                            {/* <ButtonComponent
                                value={'GOOGLE'}
                                color={'#d93025'}
                                onPress={() => googleLogin()}
                            /> */}
                            <View style={{ padding: 5 }} />
                            <ButtonComponent
                                value={'FACEBOOK'}
                                color={'#4267b2'}
                                onPress={() => facebookLogin()}
                            />
                        </View>
                    </>
                )}
                <View>
                    <Text>{accessMsg}</Text>
                </View>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Text>
                        {errorMsg && `ERROR : ${errorMsg}`}
                        {accessMsg && `USER : ${accessMsg}`}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
    },
});

export default HomeScreen;
