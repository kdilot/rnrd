/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
    onGift: (e: any) => void;
}

const MessageInput: React.FC<Props> = ({ onGift }) => {
    return (
        <View style={styles.Container}>
            <TextInput
                disableFullscreenUI={true}
                style={{ flex: 1, marginRight: 5 }}
                placeholder="입력하세요."
                placeholderTextColor={'white'}
            />
            <TouchableOpacity
                style={styles.Button}
                onPress={onGift}
                activeOpacity={1}>
                <Text style={{ color: 'white' }}>선물</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Button} activeOpacity={1}>
                <Text style={{ color: 'white' }}>보내기</Text>
            </TouchableOpacity>
        </View>
    );
};

export default MessageInput;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    Button: {
        padding: 7,
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderRadius: 3,
        marginLeft: 5,
    },
});
