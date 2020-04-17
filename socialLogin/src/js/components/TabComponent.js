import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const TabComponent = ({ type, onClick }) => {
    return (
        <>
            <View style={S.Container}>
                <TouchableWithoutFeedback onPress={() => onClick(0)}>
                    <Text style={[S.Type, type === 0 && S.Selected]}>
                        E-MAIL
                    </Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => onClick(1)}>
                    <Text style={[S.Type, type === 1 && S.Selected]}>SMS</Text>
                </TouchableWithoutFeedback>
            </View>
        </>
    );
};

const S = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    Type: {
        fontSize: 18,
        fontWeight: 'bold',
        borderBottomColor: 'transparent',
        borderBottomWidth: 3,
        color: 'white',
    },
    Selected: {
        borderBottomColor: 'white',
        borderBottomWidth: 3,
    },
});

export default TabComponent;
