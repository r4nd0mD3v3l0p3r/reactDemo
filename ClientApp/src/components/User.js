import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import MenuAppBar from './MenuAppBar';
import PropTypes from "prop-types";
import { loadUser } from '../actions';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { changeUserPassword } from '../actions';
import Snackbar from '@material-ui/core/Snackbar';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
});

class User extends React.Component {
    state =
        {
            id: '',
            name: '',
            currentPassword: '',
            newPassword: ''
        };

    componentDidMount() {
        const { dispatch, match } = this.props;

        dispatch(loadUser({ id: match.params.id }));
    }

    componentWillReceiveProps(nextProps) {
        const { user } = nextProps;

        if (user == null)
            return;

        this.setState({
            id: user.id,
            name: user.name
        });
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleEdit = () => {
        const { id, currentPassword, newPassword } = this.state;
        const { dispatch } = this.props;

        dispatch(changeUserPassword({ id, currentPassword, newPassword }));
    }

    render() {
        const { isFetching, message, edit, showMessage, invalidCredentials } = this.props;
        const { name, currentPassword, newPassword } = this.state;
        let content;

        if (edit) {
            content = (
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                >
                    <Typography component="h3" variant="h3">
                        Change Password
                        </Typography>
                    <TextField
                        id="name"
                        label="Name"
                        className={styles.textField}
                        value={name}
                        name="name"
                        margin="normal"
                        onChange={this.handleChange}
                    />
                    <TextField
                        id="currentPassword"
                        label="Current Password"
                        className={styles.textField}
                        value={currentPassword}
                        margin="normal"
                        type="password"
                        name="currentPassword"
                        onChange={this.handleChange}
                    />
                    <TextField
                        id="newPassword"
                        label="New Password"
                        className={styles.textField}
                        value={newPassword}
                        margin="normal"
                        type="password"
                        name="newPassword"
                        onChange={this.handleChange}
                    />
                    {invalidCredentials && <span component="h5" variant="h5" color="red">
                        Invalid Credentials
                    </span>}
                    <Button variant="contained" onClick={this.handleEdit}>
                        Edit
                    </Button>
                </Grid>
            );
        }
        else {
            content = (<Grid
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
                    className={styles.textField}
                    value={name}
                    name="name"
                    margin="normal"
                    onChange={this.handleChange}
                />
                <TextField
                    id="currentPassword"
                    label="Password"
                    className={styles.textField}
                    value={currentPassword}
                    margin="normal"
                    type="password"
                    name="currentPassword"
                    onChange={this.handleChange}
                />
                {invalidCredentials && <span component="h5" variant="h5" color="red">
                    Invalid Credentials
                    </span>}
                <Button variant="contained" className={styles.loginButton} onClick={this.handleLogin}>
                    Login
                    </Button>
            </Grid>);
        }

        return (
            <React.Fragment>
                <MenuAppBar>
                    <BlockUi tag="div" blocking={isFetching}>
                        {content}
                    </BlockUi>
                </MenuAppBar>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    open={showMessage}
                    autoHideDuration={3000}
                    onClose={this.handleSnackbarClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{message}</span>}
                    action={[
                    ]}
                />
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { store } = state;
    const { user, isFetching, message, edit, showMessage } = store.user;

    return { user, isFetching, message, edit, showMessage };
}

User.propTypes = {
    classes: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(User));