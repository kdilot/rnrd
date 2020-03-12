import React, { useState, useEffect } from 'react';
import { Animated, StyleSheet } from 'react-native';

interface Props {
    isVisible: boolean;
}

const VideoInfo: React.FC<Props> = ({ isVisible }) => {
    const [animation] = useState(new Animated.Value(0));
    useEffect(() => {
        Animated.timing(animation, {
            toValue: isVisible ? 60 : 0,
            duration: 300,
        }).start();
    });
    return <Animated.View style={[styles.Container, { height: animation }]} />;
};

export default VideoInfo;

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        height: 0,
        backgroundColor: 'lightyellow',
    },
});
