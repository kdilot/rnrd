/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Video from 'react-native-video';

const VideoCover: React.FC = () => {
    return (
        <Video
            source={{
                uri: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
            }}
            controls={true}
            style={{ width: '100%', height: '100%' }}
        />
    );
};

export default VideoCover;
