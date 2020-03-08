/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { SafeAreaView, View, Image } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import iid from '@react-native-firebase/iid';
import inAppMessaging from '@react-native-firebase/in-app-messaging';
import WebView from 'react-native-webview';

const App = () => {
    const bootstrap = async event => {
        if (event.title) {
            console.log('[TURN ON] IN APP MESSAGING');
            setTimeout(async () => {
                await inAppMessaging().setMessagesDisplaySuppressed(true);
            }, 2000);
        }
    };
    const getFcmToken = async () => {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
            console.log('Your Firebase Token is:', fcmToken);
        } else {
            console.log('Failed', 'No token received');
        }
    };
    const registerAppWithFCM = async () => {
        await messaging().registerForRemoteNotifications();
    };
    const requestPermission = async () => {
        await inAppMessaging().setMessagesDisplaySuppressed(false);
        const granted = await messaging().requestPermission();

        if (granted) {
            await getFcmToken();
        } else {
            console.log('[User declined messaging permissions :(]');
            await registerAppWithFCM();
            await getFcmToken();
        }
    };
    const inStanceId = async () => {
        const id = await iid().get();
        console.log('iid', id);
    };

    useEffect(() => {
        inStanceId();
        // bootstrap();
        requestPermission();
    }, []);
    return (
        <SafeAreaView>
            <View
                style={{
                    height: '100%',
                    width: '100%',
                }}>
                <WebView
                    source={{ uri: 'https://www.amipure.com' }}
                    startInLoadingState={true}
                    onLoadEnd={e => bootstrap(e.nativeEvent)}
                    renderLoading={() => (
                        <View
                            style={{
                                width: '100%',
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Image
                                source={require('./img.jpg')}
                                style={{ height: '100%', width: '100%' }}
                            />
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};

export default App;
