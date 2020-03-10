/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { SafeAreaView, View, Image } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import iid from '@react-native-firebase/iid';
import inAppMessaging from '@react-native-firebase/in-app-messaging';
import WebView from 'react-native-webview';
import PushNotification from 'react-native-push-notification';

const App = () => {
    const inStanceId = async () => {
        const id = await iid().get();
        console.log('iid', id);
    };
    useEffect(() => {
        inStanceId();
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function(token) {
                console.log('TOKEN:', token);
            },

            // (required) Called when a remote or local notification is opened or received
            onNotification: function(notification) {
                inStanceId();
                console.log('NOTIFICATION:', notification);

                // process the notification here

                // required on iOS only
                // notification.finish(PushNotificationIOS.FetchResult.NoData);
            },
            // Android only
            senderID: '437568831542',
            // iOS only
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },
            popInitialNotification: true,
            requestPermissions: true,
        });
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
                    // onLoadEnd={e => bootstrap(e.nativeEvent)}
                    renderLoading={() => (
                        <View
                            style={{
                                width: '100%',
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Image
                                source={{
                                    uri:
                                        'http://d3u1yjzx8lht2p.cloudfront.net/images/amipure/intro_yellow_duck.jpg',
                                }}
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
