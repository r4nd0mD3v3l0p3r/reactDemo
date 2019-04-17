import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { login, LOGIN_COOKIE } from '../actions';
import MenuAppBar from './MenuAppBar';
import compose from 'recompose/compose';
import { withCookies } from 'react-cookie';

const classes = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    demo: {
        height: 240,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        height: '100%',
        color: theme.palette.text.secondary,
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        flexGrow: 1
    },
    loginButton: {
        marginLeft: -12,
        marginRight: 20,
    },
});


class Login extends Component {

    state =
        {
            name: '',
            password: ''
        };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleLogin = () => {
        const { name, password } = this.state;
        const { dispatch } = this.props;

        dispatch(login({ name, password }));
    }

    render() {
        const { invalidCredentials, cookies } = this.props;
        const { name, password } = this.state;
        let content;
        const loginCookie = cookies.get(LOGIN_COOKIE);
        const logged = loginCookie !== undefined;
        if (!logged) {
            content = (
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                >
                    <Typography component="h3" variant="h3">
                        Welcome. Please Login
                        </Typography>
                    <TextField
                        id="name"
                        label="Name"
                        className={classes.textField}
                        value={name}
                        name="name"
                        margin="normal"
                        onChange={this.handleChange}
                    />
                    <TextField
                        id="password"
                        label="Password"
                        className={classes.textField}
                        value={password}
                        margin="normal"
                        type="password"
                        name="password"
                        onChange={this.handleChange}
                    />
                    {invalidCredentials && <span component="h5" variant="h5" color="red">
                        Invalid Credentials
                    </span>}
                    <Button variant="contained" className={classes.loginButton} onClick={this.handleLogin}>
                        Login
                    </Button>
                </Grid>);
        }
        else {
            content = (
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                >
                    <Typography component="h3" variant="h3">
                        Welcome back {loginCookie.name}
                    </Typography>
                </Grid>
            );
        }
        return (
            <MenuAppBar>
                {content}
            </MenuAppBar>
        );

    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { store } = state;
    const { isFetching, invalidCredentials } = store.login || {
        isFetching: false,
        invalidCredentials: false
    };

    return {
        isFetching, invalidCredentials
    };
}

export default compose(withStyles(classes, { name: 'Login' }), withCookies, connect(mapStateToProps,null))(Login);