import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from 'store';
import Counter from 'components/Counter.js';

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Counter />
            </Provider>
        );
    }
}
