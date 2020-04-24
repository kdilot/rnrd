import React, { Component, useState, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

import HeartShape from './HeartShape';

/**
 * @class FloatingHearts
 */

const FloatingHearts = ({ count, color, renderCustomShape }) => {
    const [hearts, setHearts] = useState([]);
    const [height, setHeight] = useState(null);
    const isReady = height !== null;
    const colorBook = ['#ffe3e3', '#ffa8a8', '#ff6b6b', '#f03e3e', '#c92a2a'];

    const createHeart = (index) => {
        return {
            id: index,
            right: getRandomNumber(10, 30),
        };
    };

    const removeHeart = (id) => {
        setHearts(hearts.filter((heart) => heart.id !== id));
    };

    const handleOnLayout = (e) => {
        setHeight(e.nativeEvent.layout.height);
    };

    useEffect(() => {
        console.log('asdfasfds');
        const items = Array(1).fill();
        const newHearts = items.map((item, i) => count + i).map(createHeart);

        setHearts(hearts.concat(newHearts));
    }, [count]);

    return (
        <View
            style={[styles.container]}
            onLayout={(e) => handleOnLayout(e)}
            pointerEvents="none">
            {isReady &&
                hearts.map(({ id, right }, i) => (
                    <AnimatedShape
                        key={id}
                        height={height}
                        style={{ right }}
                        onComplete={() => removeHeart(id)}>
                        {renderCustomShape ? (
                            renderCustomShape(id)
                        ) : (
                            <HeartShape color={colorBook[i % 5]} />
                        )}
                    </AnimatedShape>
                ))}
        </View>
    );
};

/**
 * @class AnimatedShape
 */

class AnimatedShape extends Component {
    constructor(props) {
        super(props);

        this.state = {
            position: new Animated.Value(0),
            shapeHeight: null,
            enabled: false,
            animationsReady: false,
        };
    }

    componentDidMount() {
        Animated.timing(this.state.position, {
            duration: 2000,
            useNativeDriver: true,
            toValue: this.props.height * -1,
        }).start(this.props.onComplete);
    }

    getAnimationStyle() {
        if (!this.state.animationsReady) {
            return { opacity: 0 };
        }

        return {
            transform: [
                { translateY: this.state.position },
                { translateX: this.xAnimation },
                { scale: this.scaleAnimation },
                { rotate: this.rotateAnimation },
            ],
            opacity: this.opacityAnimation,
        };
    }

    handleOnLayout = (e) => {
        if (this.rendered) {
            return null;
        }

        this.rendered = true;

        const height = Math.ceil(this.props.height);
        const negativeHeight = height * -1;
        const shapeHeight = e.nativeEvent.layout.height;

        this.yAnimation = this.state.position.interpolate({
            inputRange: [negativeHeight, 0],
            outputRange: [height, 0],
        });

        this.opacityAnimation = this.yAnimation.interpolate({
            inputRange: [
                0,
                height * 0.05,
                height * 0.1,
                height * 0.7,
                height - shapeHeight,
            ],
            outputRange: [0, 0, 1, 0.9, 0],
        });

        this.scaleAnimation = this.yAnimation.interpolate({
            inputRange: [0, 15, height * 0.4, height * 0.6, height],
            outputRange: [0, 1, 1.8, 1.5, 0.8],
        });

        this.xAnimation = this.yAnimation.interpolate({
            inputRange: [0, height * 0.2, height * 0.4, height * 0.7, height],
            outputRange: [
                0,
                getRandomNumber(-10, -30),
                0,
                getRandomNumber(-20, -50),
                0,
            ],
        });

        this.rotateAnimation = this.yAnimation.interpolate({
            inputRange: [0, height / 4, height / 3, height / 2, height],
            outputRange: ['0deg', '-3deg', '0deg', '3deg', '0deg'],
        });

        setTimeout(() => this.setState({ animationsReady: true }), 5);
    };

    render() {
        return (
            <Animated.View
                style={[
                    styles.shapeWrapper,
                    this.getAnimationStyle(),
                    this.props.style,
                ]}
                onLayout={this.handleOnLayout}>
                {this.props.children}
            </Animated.View>
        );
    }
}

AnimatedShape.defaultProps = {
    onComplete: () => {},
};

/**
 * Styles
 */

const styles = StyleSheet.create({
    container: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'absolute',
    },

    shapeWrapper: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'transparent',
    },
});

/**
 * Helpers
 */

const getRandomNumber = (min, max) => Math.random() * (max - min) + min;

/**
 * Exports
 */

export default FloatingHearts;
