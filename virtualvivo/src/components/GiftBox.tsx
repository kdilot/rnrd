/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { StyleSheet, Animated, View, Text } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { FlatGrid } from 'react-native-super-grid';

const ARR = new Array(10).fill(0);
const ARR2 = new Array(10).fill(1);

interface Props {
    isVisible: boolean;
    onClose: any;
    isPortrait: boolean;
}

const GiftBox: React.FC<Props> = ({ isVisible, onClose, isPortrait }) => {
    const [animation] = useState(new Animated.Value(0));
    const [giftType, setgiftType] = useState(0);
    useEffect(() => {
        Animated.timing(animation, {
            toValue: isVisible ? (isPortrait ? 300 : 200) : 0,
            duration: 300,
        }).start();
    });
    return (
        <View style={[styles.Container(isVisible)]}>
            <TouchableWithoutFeedback
                style={[styles.EmptyContainer(isVisible)]}
                onPress={onClose}
            />
            <Animated.View
                style={[
                    styles.GiftContainer(isPortrait),
                    { height: animation },
                ]}>
                <View style={styles.GiftType}>
                    <Text
                        style={[
                            styles.GiftTypeText,
                            giftType === 0 && styles.GiftTypeTextSelected,
                        ]}>
                        First
                    </Text>
                    <Text
                        style={[
                            styles.GiftTypeText,
                            giftType === 1 && styles.GiftTypeTextSelected,
                        ]}>
                        Second
                    </Text>
                </View>
                <ViewPager
                    style={styles.GiftViewer}
                    initialPage={0}
                    onPageSelected={e => setgiftType(e.nativeEvent.position)}>
                    <View style={styles.GiftViewerContents}>
                        <FlatGrid
                            itemDimension={130}
                            items={ARR}
                            renderItem={({ item }) => (
                                <Text
                                    style={{
                                        padding: 30,
                                        textAlign: 'center',
                                        borderWidth: 1,
                                    }}>
                                    {item}
                                </Text>
                            )}
                        />
                    </View>
                    <View style={styles.GiftViewerContents}>
                        <FlatGrid
                            itemDimension={130}
                            items={ARR2}
                            renderItem={({ item }) => (
                                <Text
                                    style={{
                                        padding: 30,
                                        textAlign: 'center',
                                        borderWidth: 1,
                                    }}>
                                    {item}
                                </Text>
                            )}
                        />
                    </View>
                </ViewPager>
            </Animated.View>
        </View>
    );
};

export default GiftBox;

const styles = StyleSheet.create<any>({
    Container: (isVisible: any) => ({
        height: '100%',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        zIndex: isVisible ? 1 : 0,
    }),
    EmptyContainer: (isVisible: any) => ({
        height: '100%',
        display: isVisible ? 'flex' : 'none',
    }),
    GiftContainer: (isPortrait: boolean) => ({
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        width: '100%',
        position: 'absolute',
        bottom: isPortrait ? 40 : 0,
    }),
    GiftType: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(0,0,0,0.3)',
    },
    GiftTypeText: {
        flex: 1,
        textAlign: 'center',
    },
    GiftTypeTextSelected: {
        color: 'white',
        fontWeight: 'bold',
    },
    GiftViewer: {
        flex: 1,
    },
    GiftViewerContents: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
