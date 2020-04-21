import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
    ImageBackground,
} from 'react-native';
import {
    TouchableWithoutFeedback,
    TextInput,
} from 'react-native-gesture-handler';
import FloatingHearts from '../js/components/TakeerFloatingHearts';
import Test from 'src/js/components/TakeerFloatingHearts/Test';

const LiveScreen = () => {
    const [isOverLay, setIsOverLay] = useState(false);
    const [count, setCount] = useState(0);

    return (
        <>
            <Test />
            {/* <TouchableOpacity
                activeOpacity={1}
                onPress={() => setIsOverLay(!isOverLay)}
                style={S.Container}>
                <ImageBackground
                    style={{
                        width: Dimensions.get('screen').width,
                        height: Dimensions.get('screen').height,
                    }}
                    source={require('../assets/images/bg2.jpeg')}
                    resizeMode="cover" // 'cover', 'contain', 'stretch', 'repeat', 'center' 중 선택
                ></ImageBackground>
            </TouchableOpacity>
            {isOverLay && (
                <>
                    <View style={S.TopOverlayContainer}>
                        <View style={S.AvatarView}>
                            <Image
                                style={{
                                    width: 50,
                                    height: 50,
                                }}
                                source={require('../assets/images/logo.jpg')}
                                resizeMode="cover"
                            />
                        </View>
                        <View style={S.TopTextLayout}>
                            <Text
                                style={{
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                }}>
                                재준재준 나 소고기 사쥬
                            </Text>
                            <Text style={{ color: '#fff', fontSize: 13 }}>
                                강재준 3900
                            </Text>
                        </View>
                        <View style={S.TopButtonLayout}>
                            <Image
                                source={require('../assets/images/live/upload.png')}
                                style={S.IconImage(25)}
                            />
                            <View style={S.Divider} />
                            <Image
                                source={require('../assets/images/live/volume.png')}
                                style={S.IconImage(25)}
                            />
                            <View style={S.Divider} />
                            <Image
                                source={require('../assets/images/live/close.png')}
                                style={S.IconImage(20)}
                            />
                        </View>
                    </View>
                    <View style={S.TopStatusOverlayContainer}>
                        <View
                            style={[
                                S.StatusLayout,
                                { backgroundColor: 'red', borderColor: 'red' },
                            ]}>
                            <Text style={S.StatusTextLayout}>LIVE</Text>
                        </View>
                        <View style={S.Divider} />
                        <View style={S.StatusLayout}>
                            <Text style={S.StatusTextLayout}>Follow</Text>
                        </View>
                    </View>
                    <View style={S.BottomOverlayContainer}>
                        <View style={S.ShopButtonView}>
                            <Image
                                source={require('../assets/images/live/cart.png')}
                                style={S.IconImage(40)}
                            />
                        </View>
                        <View style={S.MessageView}>
                            <TextInput
                                style={{ color: '#fff', fontSize: 13 }}
                                placeholder={'메시지...'}
                                placeholderTextColor={'#fff'}
                            />
                        </View>
                        <View style={S.TopButtonLayout}>
                            <Image
                                source={require('../assets/images/live/clip.png')}
                                style={S.IconImage(25)}
                            />
                            <View style={S.Divider} />
                            <TouchableWithoutFeedback
                                onPress={() => setCount(count + 1)}>
                                <Image
                                    source={require('../assets/images/live/heart.png')}
                                    style={[
                                        S.IconImage(25),
                                        { marginVertical: 10 },
                                    ]}
                                />
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </>
            )}
            <FloatingHearts count={count} /> */}
        </>
    );
};

const S = StyleSheet.create({
    Container: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TopOverlayContainer: {
        width: Dimensions.get('screen').width,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        flexDirection: 'row',
    },
    TopStatusOverlayContainer: {
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        top: 80,
        left: 10,
    },
    AvatarView: {
        marginHorizontal: 10,
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    ShopButtonView: {
        marginHorizontal: 10,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TopTextLayout: {
        flex: 3,
        flexDirection: 'column',
    },
    TopButtonLayout: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    StatusLayout: {
        padding: 15,
        paddingVertical: 3,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#fff',
    },
    StatusTextLayout: {
        color: '#fff',
        fontWeight: 'bold',
    },
    Divider: {
        width: 15,
    },
    BottomOverlayContainer: {
        width: Dimensions.get('screen').width,
        paddingTop: 10,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'transparent',
    },
    MessageView: {
        flex: 4,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 30,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    IconImage: (size) => ({
        width: size,
        height: size,
        tintColor: '#fff',
    }),
});

export default LiveScreen;
