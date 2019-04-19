import axios from 'axios';
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import MenuAppBar from '../MenuAppBar';
import PropTypes from "prop-types";
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { HubConnectionBuilder } from "@aspnet/signalr";
import { LOGIN_COOKIE, authHeader, wrongAuthToken } from '../../actions';
import compose from 'recompose/compose';
import { withCookies } from 'react-cookie';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    messagesList: {
        overflow: 'auto',
        maxHeight: 300,
        minHeight: 300
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    button: {
        margin: theme.spacing.unit,
    },
});

class Chat extends React.PureComponent {
    state = {
        users: [],
        messages: [],
        message: '',
        hubConnection: null,
        userName: '',
        connectedToHub: false,
        previousMessagesLoaded: false
    };

    componentWillMount() {
        const { cookies } = this.props;
        const loginCookie = cookies.get(LOGIN_COOKIE);
        const hubConnection = new HubConnectionBuilder().withUrl("/chatHub").build();

        hubConnection.start()
            .then(() => {
                hubConnection.invoke('userOnline', loginCookie.name);
                this.setState({ connectedToHub: true });
            })
            .catch(() => { this.setState({ connectedToHub: false }); });

        this.setState({ hubConnection: hubConnection, userName: loginCookie.name });
    }

    componentDidMount() {
        const { hubConnection } = this.state;

        this.fetchChatMessages();

        hubConnection.on('sendMessage', (incomingMessages) => {
            this.setState({ messages: incomingMessages });
        });

        hubConnection.on('usersOnline', (usersOnline) => {
            this.setState({ users: usersOnline });
        });
    }

    componentWillUnmount() {
        const { hubConnection, userName, connectedToHub } = this.state;

        if (connectedToHub) {
            hubConnection.invoke('userOffline', userName);
            hubConnection.stop();
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    send = () => {
        const { hubConnection, message, userName } = this.state;

        hubConnection.invoke('sendMessage', userName, message);

        this.setState({ message: '' });
    }

    chatSetupCompleted = () => {
        const { connectedToHub, previousMessagesLoaded } = this.state;

        return connectedToHub && previousMessagesLoaded;
    }

    fetchChatMessages = () => {
        const { dispatch } = this.props;

        axios.get('/api/chat', { headers: authHeader() })
            .then((response) => {
                this.setState({ messages: response.data, previousMessagesLoaded: true });
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    dispatch(wrongAuthToken());
                }
            });
    }

    render() {
        const { isFetching, classes } = this.props;
        const { message, messages, users } = this.state;

        return (
            <React.Fragment>
                <MenuAppBar title="Chat">
                    <BlockUi tag="div" blocking={isFetching}>
                        <div className={classes.root}>
                            <Grid container spacing={24}>
                                <Grid item xs={2}>
                                    <Paper className={classes.paper} >
                                        <Typography component="span" className={classes.inline} color="textPrimary">
                                            Online Users
                                        </Typography>
                                        <List className={classes.messagesList}>
                                            {users.map((user, index) => {
                                                return (
                                                    <ListItem key={index}>
                                                        <ListItemText
                                                            primary=''
                                                            secondary={
                                                                <React.Fragment>
                                                                    <Typography component="span" className={classes.inline} color="textPrimary">
                                                                        {user}
                                                                    </Typography>
                                                                </React.Fragment>
                                                            }
                                                        />
                                                    </ListItem>);
                                            })}
                                        </List>
                                    </Paper>
                                </Grid>
                                <Grid item xs={10}>
                                    <Paper className={classes.paper}>
                                        <List className={classes.messagesList}>
                                            {messages.map((message, index) => {
                                                return (
                                                    <ListItem key={index}>
                                                        <ListItemText
                                                            primary=''
                                                            secondary={
                                                                <React.Fragment>
                                                                    <Typography component="span" className={classes.inline} color="textPrimary">
                                                                        {message.author}
                                                                    </Typography>
                                                                    {message.text}
                                                                </React.Fragment>
                                                            }
                                                        />
                                                    </ListItem>);
                                            })}
                                        </List>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>
                                    <Paper className={classes.paper}>
                                        <TextField
                                            id="message"
                                            label="Type your message here"
                                            className={styles.textField}
                                            value={message}
                                            name="message"
                                            margin="normal"
                                            onChange={this.handleChange}
                                        />
                                        <Button variant="contained" className={classes.button} onClick={this.send} disabled={!this.chatSetupCompleted()}>
                                            Send Message
                                        </Button>
                                    </Paper>

                                </Grid>
                            </Grid>
                        </div>
                    </BlockUi>
                </MenuAppBar>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { store } = state;
    const { usersList, isFetching, errorMessage } = store.users;

    return { usersList, isFetching, errorMessage };
}

Chat.propTypes = {
    classes: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default compose(withStyles(styles, { name: 'Chat' }), withCookies, connect(mapStateToProps, null))(Chat);