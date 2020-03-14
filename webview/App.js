/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Image, Text, TouchableOpacity} from 'react-native';
import ProgressWebView from 'react-native-progress-webview';
import NetInfo from '@react-native-community/netinfo';

const App = () => {
  const [isConnected, setIsConnected] = useState(true);
  const onNetwork = () => {
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
    });
  };
  useEffect(() => {
    onNetwork();
  });
  return (
    <SafeAreaView>
      <View
        style={{
          height: '100%',
          width: '100%',
        }}>
        {isConnected ? (
          <ProgressWebView
            source={{uri: 'https://www.amipure.com'}}
            startInLoadingState={true}
            // onLoadEnd={e => bootstrap(e.nativeEvent)}
            color={'yellow'}
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
                  style={{height: '100%', width: '100%'}}
                />
              </View>
            )}
          />
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white', marginBottom: 10}}>
              네트워크에 연결 할 수 없습니다.
            </Text>
            <TouchableOpacity
              onPress={() => onNetwork()}
              style={{
                borderWidth: 1,
                borderColor: 'white',
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white'}}>다시시도</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default App;
