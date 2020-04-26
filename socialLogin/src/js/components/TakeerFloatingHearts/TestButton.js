/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import Test from './Test';

const TestButton = () => {
    const [count, setCount] = useState(0);
    return (
        <View style={{ flex: 1, backgroundColor: 'transparent' }}>
            <TouchableOpacity
                style={S.Button}
                onPress={() => setCount(count + 1)}>
                <Image
                    source={require('./heart.png')}
                    style={{ tintColor: '#fff' }}
                />
            </TouchableOpacity>
            <Test count={count} />
        </View>
    );
};

const S = StyleSheet.create({
    Button: {
        backgroundColor: 'red',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 32,
        left: 32,
    },
});

export default TestButton;
