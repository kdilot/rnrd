/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { Text, View, Keyboard } from 'react-native';
import styled from 'styled-components/native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { VideoInfo, GiftBox } from '@components';
import useDeviceOrientation from '@rnhooks/device-orientation';

const Test: React.FC = () => {
    const deviceOrientation = useDeviceOrientation();
    const [isVideoInfo, setIsVideoInfo] = useState(false);
    const [isGiftBox, setIsGiftBox] = useState(false);
    const [isPortrait, setIsPortrait] = useState(true);
    const resetVisible = () => {
        setIsVideoInfo(false);
        setIsGiftBox(false);
    };
    useEffect(() => {
        // 키보드 활성시 메뉴 숨김
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            resetVisible,
        );
        return () => {
            this.keyboardDidShowListener.remove();
        };
    });
    useEffect(() => {
        setIsPortrait(deviceOrientation === 'portrait' ? true : false);
    }, [deviceOrientation]);
    return isPortrait ? (
        <Container>
            <VedioLayout
                onPress={() => setIsVideoInfo(!isVideoInfo)}
                activeOpacity={1}>
                <Text>영상영역</Text>
            </VedioLayout>
            <VideoInfo isVisible={isVideoInfo} />
            <MessageLayout>
                <Text>채팅입니다..</Text>
            </MessageLayout>
            <GiftBox
                isVisible={isGiftBox}
                onClose={setIsGiftBox}
                isPortrait={isPortrait}
            />
            <InputLayout>
                <View
                    style={{
                        alignItems: 'center',
                        flex: 1,
                        flexDirection: 'row',
                        paddingHorizontal: 10,
                    }}>
                    <TextInput
                        disableFullscreenUI={true}
                        style={{ flex: 1, marginRight: 5 }}
                        placeholder="입력하세요."
                    />
                    <TouchableOpacity
                        onPress={() => setIsGiftBox(!isGiftBox)}
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
    ) : (
        <Container>
            <LandLayout>
                <VedioLayoutLand
                    onPress={() => setIsVideoInfo(!isVideoInfo)}
                    activeOpacity={1}>
                    <Text>영상영역</Text>
                </VedioLayoutLand>
                <View style={{ flex: 2 }}>
                    <MessageLayout>
                        <Text>채팅입니다..</Text>
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
                                disableFullscreenUI={true}
                                style={{ flex: 1, marginRight: 5 }}
                                placeholder="입력하세요."
                            />
                            <TouchableOpacity
                                onPress={() => setIsGiftBox(!isGiftBox)}
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
                </View>
            </LandLayout>
            <GiftBox
                isVisible={isGiftBox}
                onClose={setIsGiftBox}
                isPortrait={isPortrait}
            />
            <VideoInfo isVisible={isVideoInfo} />
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
    justify-content: center;
    align-items: center;
    z-index: 1;
`;

const MessageLayout = styled.View`
    width: 100%;
    flex: 1;
    background: lightgreen;
    border-top-width: 1px;
    border-top-color: 'rgba(0,0,0,0.3)';
    padding: 5px;
    z-index: 1;
`;

const InputLayout = styled.View`
    width: 100%;
    height: 40px;
    background: white;
    border-top-width: 1px;
    border-top-color: 'rgba(0,0,0,0.3)';
    z-index: 1;
`;

const LandLayout = styled.View`
    width: 100%;
    height: 100%;
    flex: 1;
    flex-direction: row;
`;

const VedioLayoutLand = styled.TouchableOpacity`
    width: 100%;
    flex: 5;
    background: lightcoral;
    justify-content: center;
    align-items: center;
    z-index: 1;
`;
