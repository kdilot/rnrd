/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
    Animated,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

interface Props {
    isVisible: boolean;
    isKeyboard: boolean;
}

const VideoInfo: React.FC<Props> = ({ isVisible, isKeyboard }) => {
    const [animation] = useState(new Animated.Value(0));
    const [opacityAni] = useState(new Animated.Value(0));
    useEffect(() => {
        Animated.timing(animation, {
            toValue: isVisible ? 80 : 0,
            duration: 300,
        }).start();
        Animated.timing(opacityAni, {
            toValue: isVisible ? 1 : 0,
            duration: 300,
        }).start();
    });
    return (
        <Animated.View style={[styles.Container, { height: animation }]}>
            <Animated.View
                style={[
                    styles.Avatar,
                    { opacity: opacityAni },
                    (!isVisible || isKeyboard) && { display: 'none' },
                ]}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>TRIZ</Text>
            </Animated.View>
            <Animated.View
                style={[
                    styles.Contents,
                    { opacity: opacityAni },
                    (!isVisible || isKeyboard) && { display: 'none' },
                ]}>
                <View>
                    <Text>트리즈</Text>
                    <Text>영상 라이브 스트리밍 서비스</Text>
                </View>
                <TouchableOpacity style={styles.Button} activeOpacity={1}>
                    <Text style={{ color: 'white' }}>구독</Text>
                </TouchableOpacity>
            </Animated.View>
        </Animated.View>
    );
};

export default VideoInfo;

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 0,
        zIndex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        position: 'relative',
    },
    Avatar: {
        width: 50,
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightblue',
        marginRight: 10,
    },
    Contents: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 10,
    },
    Button: {
        padding: 10,
        backgroundColor: 'rgba(0,0,0,1)',
        borderRadius: 3,
    },
});
