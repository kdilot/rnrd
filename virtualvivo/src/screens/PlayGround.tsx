import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { VideoInfo, GiftBox, MessageInput } from '@components';
import useDeviceOrientation from '@rnhooks/device-orientation';
import useKeyboard from '@rnhooks/keyboard';

const Test: React.FC = () => {
    const deviceOrientation = useDeviceOrientation();
    const [isVideoInfo, setIsVideoInfo] = useState(false);
    const [isGiftBox, setIsGiftBox] = useState(false);
    const [isPortrait, setIsPortrait] = useState(true);
    const [visible] = useKeyboard();
    const resetVisible = () => {
        setIsVideoInfo(false);
        setIsGiftBox(false);
    };
    useEffect(() => {
        if (visible) {
            resetVisible();
        }
    });
    useEffect(() => {
        setIsPortrait(deviceOrientation === 'portrait' ? true : false);
    }, [deviceOrientation]);
    return isPortrait ? (
        <Container>
            <VedioLayout
                onPress={() => setIsVideoInfo(!isVideoInfo)}
                activeOpacity={1}>
                {/* <VideoCover /> */}
            </VedioLayout>
            <VideoInfo isVisible={isVideoInfo} isKeyboard={visible} />
            <MessageLayout>
                <Text>채팅입니다..</Text>
            </MessageLayout>
            <GiftBox
                isVisible={isGiftBox}
                onClose={setIsGiftBox}
                isPortrait={isPortrait}
            />
            <InputLayout>
                <MessageInput onGift={() => setIsGiftBox(!isGiftBox)} />
            </InputLayout>
        </Container>
    ) : (
        <Container>
            <LandLayout>
                <LandVideoGroup>
                    <LandVedioLayout
                        onPress={() => setIsVideoInfo(!isVideoInfo)}
                        activeOpacity={1}>
                        {/* <VideoCover /> */}
                    </LandVedioLayout>
                    <GiftBox
                        isVisible={isGiftBox}
                        onClose={setIsGiftBox}
                        isPortrait={isPortrait}
                    />
                </LandVideoGroup>
                <LandChatGroup>
                    <MessageLayout>
                        <Text>채팅입니다..</Text>
                    </MessageLayout>
                    <InputLayout>
                        <MessageInput onGift={() => setIsGiftBox(!isGiftBox)} />
                    </InputLayout>
                </LandChatGroup>
            </LandLayout>
            <VideoInfo isVisible={isVideoInfo} isKeyboard={visible} />
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
    justify-content: center;
    align-items: center;
    z-index: 1;
`;

const MessageLayout = styled.View`
    width: 100%;
    flex: 1;
    background-color: #d9dddc;
    border-top-width: 1px;
    border-top-color: 'rgba(0,0,0,0.3)';
    padding: 10px;
`;

const InputLayout = styled.View`
    width: 100%;
    height: 40px;
    background: white;
    border-top-width: 1px;
    border-top-color: 'rgba(0,0,0,0.3)';
`;

const LandLayout = styled.View`
    width: 100%;
    height: 100%;
    flex: 1;
    flex-direction: row;
`;

const LandVideoGroup = styled.View`
    flex: 5;
    flex-direction: column;
    z-index: 1;
`;

const LandChatGroup = styled.View`
    flex: 2;
    z-index: 1;
`;

const LandVedioLayout = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
    z-index: 1;
`;
