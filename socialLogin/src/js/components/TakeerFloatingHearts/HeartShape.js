import React from 'react';
import { Image } from 'react-native';

/**
 * @class HeartShape
 */

const HeartShape = ({ color }) => {
    return (
        <Image
            source={require('./heart.png')}
            style={{ tintColor: color, width: 30, height: 30 }}
        />
    );
};

HeartShape.defaultProps = {
    color: 'red',
};

/**
 * Exports
 */

export default HeartShape;
