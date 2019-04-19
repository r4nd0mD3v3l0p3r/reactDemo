import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import MenuAppBar from '../MenuAppBar';
import PropTypes from "prop-types";
import { fetchForumThreads, createForumThread } from '../../actions';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import Snackbar from '@material-ui/core/Snackbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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

class ForumThreads extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            newThreadTitle: '',
            dialogOpen: false
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchForumThreads());
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    showDialog = () => {
        this.setState({ dialogOpen: true, newThreadTitle: '' });
    }

    handleClose = () => {
        this.setState({ dialogOpen: false });
    }

    handleCreate = () => {
        const { dispatch, name } = this.props;
        const { newThreadTitle } = this.state;

        dispatch(createForumThread(newThreadTitle, name));

        this.setState({ dialogOpen: false });
    }

    render() {
        const { dialogOpen, newThreadTitle } = this.state;
        const { threads, isFetching, classes, message } = this.props;

        return (
            <React.Fragment>
                <MenuAppBar title="Forum Threads">
                    <BlockUi tag="div" blocking={isFetching}>
                        <Button variant="contained" className={classes.button} onClick={this.showDialog}>
                            New thread
                            <EditIcon className={classes.rightIcon} />
                        </Button>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Author</TableCell>
                                    <TableCell>Creation Date</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {threads.map(row => {
                                    return (
                                        <TableRow key={row.id}>
                                            <TableCell component="th" scope="row">
                                                {row.title}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {row.author}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                <Moment>{row.creationDate}</Moment>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button variant="contained" className={classes.button} component={Link} to={`/forum/thread/${row.id}`}>
                                                    Open
                                                    <EditIcon className={classes.rightIcon} />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
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
                    <DialogTitle id="form-dialog-title">Create new forum thread</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter the name of the new thread
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="newThreadTitle"
                            name="newThreadTitle"
                            label="Thread Title"
                            type="text"
                            value={newThreadTitle}
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
    const { threads, isFetching, message } = store.forum;
    const { name } = store.login;

    return { threads, isFetching, name, message };
}

ForumThreads.propTypes = {
    classes: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(ForumThreads));