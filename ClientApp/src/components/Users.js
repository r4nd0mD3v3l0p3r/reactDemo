import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import MenuAppBar from './MenuAppBar';
import PropTypes from "prop-types";
import { loadUsersList, deleteUser } from '../actions';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import Snackbar from '@material-ui/core/Snackbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";
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


class Users extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            usersList: [],
            errorMessage: '',
            deletionDialogOpen: false,
            selectedRowId: ''
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(loadUsersList(dispatch));
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ errorMessage: nextProps.errorMessage });
    }

    handleSnackbarClose = (event, reason) => {
        this.setState({ errorMessage: '' });
    };

    delete = row => {
        this.setState({ selectedRowId: row.id, deletionDialogOpen: true });
    };

    handleDeletionDialogClose = () => {
        this.setState({ deletionDialogOpen: false });
    }

    handleDeletionDialogOk = () => {
        const { dispatch } = this.props;
        const { selectedRowId } = this.state;

        this.handleDeletionDialogClose();

        dispatch(deleteUser({ id: selectedRowId }));
    }

    render() {
        const { errorMessage, deletionDialogOpen } = this.state;
        const { usersList, isFetching, classes } = this.props;

        return (
            <React.Fragment>
                <MenuAppBar>
                    <BlockUi tag="div" blocking={isFetching}>
                        <Button variant="contained" className={classes.button} component={Link} to={'/user'}>
                            Create new user
                            <EditIcon className={classes.rightIcon} />
                        </Button>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>User Name</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {usersList.map(row => {
                                    return (
                                        <TableRow key={row.id}>
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button variant="contained" className={classes.button} component={Link} to={`/user/${row.id}`}>
                                                    Edit
                                                    <EditIcon className={classes.rightIcon} />
                                                </Button>
                                                <Button variant="contained" className={classes.button} onClick={(() => this.delete(row))}>
                                                    Delete
                                                    <DeleteIcon className={classes.rightIcon} />
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
                    open={!!errorMessage}
                    autoHideDuration={3000}
                    onClose={this.handleSnackbarClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{errorMessage}</span>}
                    action={[
                    ]}
                />

                <Dialog
                    open={deletionDialogOpen}
                    onClose={this.handleDeletionDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"User Deletion"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete the selected user?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDeletionDialogClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleDeletionDialogOk} color="primary" autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { store } = state;
    const { usersList, isFetching, errorMessage } = store.users;

    return { usersList, isFetching, errorMessage };
}

Users.propTypes = {
    classes: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(Users));