/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as countActions from 'modules/countReducer';
import { Button, View, Text, StyleSheet } from 'react-native';

class Counter extends Component {
    render() {
        // console.warn('asdas', this.props.param);
        const { CountAction, param } = this.props;
        const { count } = param;
        // const { count } = this.props.count;
        return (
            <View>
                <View>
                    <Text style={styles.container}>Redux Counter</Text>
                </View>
                <View>
                    <Text style={styles.container}>{count}</Text>
                    <View style={styles.btnLayout}>
                        <Button
                            title="Redux Increment"
                            onPress={() => CountAction.setIncrement()}
                            style={{ marginVertical: 10 }}
                        />
                    </View>
                    <View style={styles.btnLayout}>
                        <Button
                            title="Redux Decrement"
                            onPress={() => CountAction.setDecrement()}
                            style={{ marginVertical: 10 }}
                        />
                    </View>
                    <View style={styles.btnLayout}>
                        <Button
                            title="Redux Saga Increment"
                            onPress={() => CountAction.setIncrementSaga()}
                            style={{ marginVertical: 10 }}
                        />
                    </View>
                    <View style={styles.btnLayout}>
                        <Button
                            title="Redux Saga Decrement"
                            onPress={() => CountAction.setDecrementSaga()}
                            style={{ marginVertical: 10 }}
                        />
                    </View>
                </View>
                <View>
                    <Text style={styles.container}>Test Version 0.13</Text>
                </View>
            </View>
        );
    }
}

export default connect(
    state => ({
        param: state.countReducer,
    }),
    dispatch => ({
        CountAction: bindActionCreators(countActions, dispatch),
    }),
)(Counter);

const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
        padding: 10,
    },
    btnLayout: {
        padding: 10,
        margin: 5,
    },
});
