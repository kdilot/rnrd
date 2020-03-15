import React from 'react';
import Video from 'react-native-video';
import { StyleSheet } from 'react-native';

const VideoCover: React.FC = () => {
    return (
        <Video
            source={{ uri: 'https://www.youtube.com/watch?v=ysz5S6PUM-U' }} // Can be a URL or a local file.
            style={styles.backgroundVideo}
            controls={true}
        />
    );
};

var styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});

export default VideoCover;
