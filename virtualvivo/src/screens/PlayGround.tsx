/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { VideoInfo } from '@components';

const Test: React.FC = () => {
    const [isVideoInfo, setIsVideoInfo] = useState(false);
    return (
        <Container>
            <VedioLayout
                onPress={() => setIsVideoInfo(!isVideoInfo)}
                activeOpacity={1}>
                <Text>{isVideoInfo ? 'TRUE' : 'FALSE'}</Text>
            </VedioLayout>
            {<VideoInfo isVisible={isVideoInfo} />}
            <MessageLayout>
                <Text>sd</Text>
            </MessageLayout>
            <InputLayout>
                <View
                    style={{
                        alignItems: 'center',
                        flex: 1,
                        flexDirection: 'row',
                        paddingHorizontal: 10,
                    }}>
                    <TextInput
                        style={{ flex: 1, marginRight: 5 }}
                        placeholder="입력하세요."
                    />
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{
                            padding: 5,
                            backgroundColor: 'black',
                            borderRadius: 5,
                            marginRight: 5,
                        }}>
                        <Text style={{ color: 'white' }}>선물</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{
                            padding: 5,
                            backgroundColor: 'black',
                            borderRadius: 5,
                        }}>
                        <Text style={{ color: 'white' }}>보내기</Text>
                    </TouchableOpacity>
                </View>
            </InputLayout>
        </Container>
    );
};

export default Test;

const Container = styled.View`
    align-items: center;
    height: 100%;
`;

const VedioLayout = styled.TouchableOpacity`
    width: 100%;
    height: 260px;
    background: lightcoral;
`;

const MessageLayout = styled.View`
    width: 100%;
    flex: 1;
    background: lightgreen;
`;

const InputLayout = styled.View`
    width: 100%;
    height: 40px;
    background: white;
    border-top-width: 0.5px;
`;
