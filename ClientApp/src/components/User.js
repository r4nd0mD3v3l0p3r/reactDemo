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
import { changeUserPassword, addUser, createUser } from '../actions';
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
            newPassword: '',
            password: ''
        };

    componentDidMount() {
        const { dispatch, match } = this.props;
        const id = match.params.id;

        if (typeof id === "undefined") {
            dispatch(createUser());
        }
        else {
            dispatch(loadUser({ id }));
        }
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

    handleCreate = () => {
        const { name, password } = this.state;
        const { dispatch } = this.props;

        dispatch(addUser({ name, password }));
    }

    render() {
        const { isFetching, message, edit, showMessage } = this.props;
        const { name, currentPassword, newPassword, password } = this.state;
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
                        disabled={true}
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
                    Add new user
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
                    id="password"
                    label="Password"
                    className={styles.textField}
                    value={password}
                    margin="normal"
                    type="password"
                    name="password"
                    onChange={this.handleChange}
                />
                <Button variant="contained" className={styles.loginButton} onClick={this.handleCreate}>
                    Create New User
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