import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import { Switch } from 'react-router';
import configureStore from './configureStore';
import Home from './components/Home';
import Login from './components/Login';
import Users from './components/Users';
import User from './components/User';

const store = configureStore();
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
export default class App extends Component {
    displayName = App.name;

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/users' component={Users} />
                        <Route exact path='/user/:id' component={User} />
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}
