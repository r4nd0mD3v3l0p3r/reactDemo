import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { login } from '../actions';

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
});


class Home extends Component {
    displayName = Home.name

    constructor(props) {
        super(props);

        this.state =
            {
                name: '',
                password: ''
            };

        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleLogin() {
        const { name, password } = this.state;
        const { dispatch } = this.props;

        dispatch(login({ name, password }));
    }

    render() {
        const { logged, isFetching } = this.props;
        const { name, password } = this.state;

        if (!logged) {
            return (
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center">
                    <Paper className={classes.root} elevation={1}>
                        <Typography variant="h5" component="h3">
                            Welcome. Please Login
                    </Typography>
                    </Paper>
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
                    <Button variant="contained" className={classes.button} onClick={this.handleLogin}>
                        Login
                </Button>
                </Grid>);
        }
        else {
            return (
                <div>
                    <h1>blabla</h1>
                </div>);
        }
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { store } = state;
    const { isFetching, logged } = store.login || {
        isFetching: false,
        logged: false
    };

    return {
        logged, isFetching
    };
}

export default connect(mapStateToProps)(withStyles(classes)(Home));