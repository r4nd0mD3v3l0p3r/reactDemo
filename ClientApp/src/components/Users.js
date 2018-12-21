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
            errorMessage: ''
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

    edit = name => {

    };

    delete = row => {
        const { dispatch } = this.props;
        dispatch(deleteUser({ id: row.id }));
    };

    render() {
        const { errorMessage } = this.state;
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