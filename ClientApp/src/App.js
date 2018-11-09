import React, { Component } from 'react';
import { Route } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import Home from './components/Home';

const store = configureStore();

export default class App extends Component {
    displayName = App.name

    render() {
        return (
            <Provider store={store}>
                <Route exact path='/' component={Home} />
            </Provider>
        );
    }
}
