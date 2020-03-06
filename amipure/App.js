import React, { useEffect } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import WebView from 'react-native-webview';

const App = () => {
    const getFcmToken = async () => {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
            console.log('Your Firebase Token is:', fcmToken);
        } else {
            console.log('Failed', 'No token received');
        }
    };

    useEffect(() => {
        getFcmToken();
    });
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
                    renderLoading={() => (
                        <View
                            style={{
                                width: '100%',
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text>LOADING</Text>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};

export default App;
