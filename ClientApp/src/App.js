import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Switch } from 'react-router';
import configureStore from './configureStore';
import Home from './components/Home';
import Login from './components/Login';
import Users from './components/users/Users';
import User from './components/users/User';
import history from './components/History';
import ForumThreads from './components/forum/ForumThreads';
import ForumThreadPosts from './components/forum/ForumThreadPosts';
import PrivateRoute from './components/PrivateRoute';
import Chat from './components/chat/Chat';
import { CookiesProvider } from 'react-cookie';

const store = configureStore();
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
export default class App extends Component {
    displayName = App.name;

    render() {
        return (
            <CookiesProvider>
                <Provider store={store}>
                    <Router history={history}>
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/login' component={Login} />
                            <PrivateRoute exact path='/users' component={Users} />
                            <PrivateRoute exact path='/user/:id' component={User} />
                            <PrivateRoute exact path='/user' component={User} />
                            <PrivateRoute exact path='/forum' component={ForumThreads} />
                            <PrivateRoute exact path='/forum/thread/:id' component={ForumThreadPosts} />
                            <PrivateRoute exact path='/chat' component={Chat} />
                        </Switch>
                    </Router>
                </Provider>
            </CookiesProvider>
        );
    }
}
