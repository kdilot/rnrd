import React, { Component } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

import HeartShape from './HeartShape';

/**
 * @class FloatingHearts
 */

class FloatingHearts extends Component {
    state = {
        hearts: [],
        height: null,
    };

    createHeart(index) {
        return {
            id: index,
            right: getRandomNumber(10, 30),
            color: colorBook(),
        };
    }

    removeHeart(id) {
        this.setState({
            hearts: this.state.hearts.filter((heart) => heart.id !== id),
        });
    }

    UNSAFE_componentWillUpdate(nextProps) {
        const oldCount = this.props.count;
        const newCount = nextProps.count;
        const numHearts = newCount - oldCount;

        if (numHearts <= 0) {
            return;
        }

        const items = Array(numHearts).fill();
        const newHearts = items
            .map((item, i) => oldCount + i)
            .map(this.createHeart);
        this.setState({ hearts: this.state.hearts.concat(newHearts) });
    }

    handleOnLayout = (e) => {
        const height = e.nativeEvent.layout.height;

        this.setState({ height });
    };

    render() {
        const { height } = this.state;
        const { renderCustomShape } = this.props;
        const isReady = height !== null;

        return (
            <View
                style={[styles.container, this.props.style]}
                onLayout={this.handleOnLayout}
                pointerEvents="none">
                {isReady &&
                    this.state.hearts.map(({ id, right, color }, i) => (
                        <AnimatedShape
                            key={id}
                            height={height}
                            style={{ right }}
                            onComplete={this.removeHeart.bind(this, id)}>
                            {renderCustomShape ? (
                                renderCustomShape(id)
                            ) : (
                                <HeartShape color={color} />
                            )}
                        </AnimatedShape>
                    ))}
            </View>
        );
    }
}

FloatingHearts.defaultProps = {
    count: -1,
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
            inputRange: [0, height * 0.05, height * 0.1, height * 0.2, height],
            outputRange: [0, 1, 1.8, 1, 0.8],
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

const colorBook = () => {
    const num = Math.round(Math.random() * 4);
    const color = ['#ffe3e3', '#ffa8a8', '#ff6b6b', '#f03e3e', '#c92a2a'];

    return color[num];
};

/**
 * Exports
 */

export default FloatingHearts;
