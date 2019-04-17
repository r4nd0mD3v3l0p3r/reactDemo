import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import MenuAppBar from './MenuAppBar';
import PropTypes from "prop-types";
import { fetchForumThreadPosts, createForumThreadPost } from '../actions';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import Snackbar from '@material-ui/core/Snackbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import Moment from 'react-moment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

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
    inline: {
        display: 'inline',
    },
});

class ForumThreadPosts extends React.PureComponent {

    constructor(props) {
        super(props);
        const { match } = this.props;
        const threadId = match.params.id;

        this.state = { message: '', threadId: threadId, dialogOpen: false, newPostText: '' };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        const { threadId } = this.state;

        dispatch(fetchForumThreadPosts(threadId));
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    showDialog = () => {
        this.setState({ dialogOpen: true, newPostText: '' });
    }

    handleClose = () => {
        this.setState({ dialogOpen: false });
    }

    handleCreate = () => {
        const { dispatch, name } = this.props;
        const { newPostText, threadId } = this.state;

        dispatch(createForumThreadPost(newPostText, name, threadId));

        this.setState({ dialogOpen: false });
    }

    render() {
        const { message, dialogOpen, newPostText } = this.state;
        const { posts, isFetching, classes } = this.props;
        const threadTitle = posts.length > 0 ? ` Forum Thread: ${posts[0].threadTitle}` : '';
        return (
            <React.Fragment>
                <MenuAppBar title={threadTitle}>
                    <BlockUi tag="div" blocking={isFetching}>
                        <Button variant="contained" className={classes.button} onClick={this.showDialog}>
                            New post
                            <EditIcon className={classes.rightIcon} />
                        </Button>
                        <List className={classes.root}>
                            {posts.map(row => {
                                return (
                                    <ListItem key={row.id}>
                                        <ListItemText
                                            primary={row.text}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography component="span" className={classes.inline} color="textPrimary">
                                                        {row.author}
                                                    </Typography>{'  '}
                                                    <Moment>{row.creationDate}</Moment>
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>);
                            })}
                        </List>
                    </BlockUi>
                </MenuAppBar>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    open={!!message}
                    autoHideDuration={3000}
                    onClose={this.handleSnackbarClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{message}</span>}
                    action={[
                    ]}
                />
                <Dialog
                    open={dialogOpen}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Add a new post</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter your message here
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="newPostText"
                            name="newPostText"
                            label="Post Text"
                            type="text"
                            value={newPostText}
                            onChange={this.handleChange}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleCreate} color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { store } = state;
    const { posts, isFetching, message } = store.forum;
    const { name } = store.login;

    return { posts, isFetching, message, name };
}

ForumThreadPosts.propTypes = {
    classes: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(ForumThreadPosts));