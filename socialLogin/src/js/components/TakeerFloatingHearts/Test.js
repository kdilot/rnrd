/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    View,
    StyleSheet,
    Animated,
    Dimensions,
    Image,
    Text,
} from 'react-native';

const { height } = Dimensions.get('screen');
const animationEndY = Math.ceil(height * 0.7);
const negativeEndY = animationEndY * -1;

const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};

const getRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
};

const getRandomColor = () => {
    return `rgb(${getRandomNumber(100, 144)},${getRandomNumber(
        10,
        200,
    )},${getRandomNumber(200, 244)})`;
};

const Test = ({ count }) => {
    const [hearts, setHearts] = useState([]);
    const prevCount = usePrevious(count) || 0;

    const addHeart = (index) => {
        return {
            id: index,
            right: getRandomNumber(20, 150),
            color: getRandomColor(),
        };
    };

    const removeHeart = useCallback(
        (id) => {
            console.log('REMOVE 실행 ', id, hearts.length);
            setHearts(
                hearts.filter((heart) => {
                    return heart.id !== id;
                }),
            );
        },
        [hearts],
    );

    useEffect(() => {
        const oldCount = prevCount;
        const newCount = count;
        const numHearts = newCount - oldCount;

        if (numHearts <= 0) {
            return;
        }
        console.log(
            `비교 => 차이 : ${numHearts}, 이전 : ${oldCount}, 현재 : ${newCount}`,
        );

        const items = Array(numHearts).fill();
        const newHearts = items.map((item, i) => oldCount + i).map(addHeart);
        setHearts(hearts.concat(newHearts));
        console.log('하트 배열 ', hearts.length);
    }, [count, prevCount, hearts]);

    useEffect(() => {
        console.log('하트 개수 변동 발생 ', hearts.length);
    }, [hearts]);

    return (
        <View style={{ flex: 1 }}>
            <Text>{hearts.length}</Text>
            <View style={{ flex: 1 }} pointerEvents="none">
                {hearts.map((heart) => (
                    <HeartContainer
                        key={heart.id}
                        style={{ right: heart.right }}
                        onComplete={() => removeHeart(heart.id)}
                        color={heart.color}
                    />
                ))}
            </View>
        </View>
    );
};

const HeartLayout = (props) => {
    return (
        <Image
            source={require('./heart.png')}
            style={{ tintColor: props.color }}
        />
    );
};

const HeartContainer = (props) => {
    const position = useRef(new Animated.Value(0)).current;

    const yAnimation = position.interpolate({
        inputRange: [negativeEndY, 0],
        outputRange: [animationEndY, 0],
    });

    const opacityAnimation = yAnimation.interpolate({
        inputRange: [0, animationEndY],
        // outputRange: [1, 0],
        outputRange: [1, 1],
    });

    const scaleAnimation = yAnimation.interpolate({
        inputRange: [0, 15, 30],
        outputRange: [0, 1.8, 1],
        extrapolate: 'clamp',
    });

    const xAnimation = yAnimation.interpolate({
        inputRange: [
            0,
            animationEndY / 6,
            animationEndY / 3,
            animationEndY / 2,
            animationEndY,
        ],
        outputRange: [0, 25, 15, 0, 10],
    });

    const rotateAnimation = yAnimation.interpolate({
        inputRange: [
            0,
            animationEndY / 6,
            animationEndY / 3,
            animationEndY / 2,
            animationEndY,
        ],
        outputRange: ['0deg', '-5deg', '0deg', '5deg', '0deg'],
    });

    const getHeartStyle = () => {
        return {
            transform: [
                { translateY: position },
                { scale: scaleAnimation },
                { translateX: xAnimation },
                { rotate: rotateAnimation },
            ],
            opacity: opacityAnimation,
        };
    };

    useEffect(() => {
        console.log('최초실행');
        Animated.timing(position, {
            duration: 2000,
            toValue: negativeEndY,
            useNativeDriver: true,
        }).start(props.onComplete);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Animated.View
            style={[S.AnimatedContainer, getHeartStyle(), props.style]}>
            <HeartLayout color={props.color} />
        </Animated.View>
    );
};

const S = StyleSheet.create({
    AnimatedContainer: {
        position: 'absolute',
        bottom: 30,
        backgroundColor: 'transparent',
    },
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

export default Test;
