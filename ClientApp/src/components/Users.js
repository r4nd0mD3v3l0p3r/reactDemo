import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import MenuAppBar from './MenuAppBar';
import PropTypes from "prop-types";
import { loadUsersList, addUsers, editUser } from '../actions';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import Snackbar from '@material-ui/core/Snackbar';

import {
    FilteringState,
    IntegratedFiltering,
    EditingState
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableFilterRow,
    TableEditRow,
    TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui';

const styles = theme => ({
    root: {
        display: "flex"
    },
});


class Users extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { name: 'name', title: 'Name' },
                { name: 'password', title : 'Password'}
            ],
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

    commitChanges = ({ added, changed, deleted }) => {
        const { usersList, dispatch } = this.props;

        if (added) {
            dispatch(addUsers(added[0]));
        }
        if (changed) {
            dispatch(editUser(changed[0]));
        }
        if (deleted) {
            const deletedSet = new Set(deleted);
            usersList = usersList.filter(row => !deletedSet.has(row.id));
        }
        this.setState({ usersList });
    }

    handleSnackbarClose = (event, reason) => {
        this.setState({ errorMessage: '' });
    };

    render() {
        const { columns, errorMessage } = this.state;
        const { usersList, isFetching } = this.props;

        return (
            <React.Fragment>
                <MenuAppBar>
                    <BlockUi tag="div" blocking={isFetching}>
                        <Grid
                            rows={usersList}
                            columns={columns}
                        >
                            <FilteringState defaultFilters={[]} columnExtensions={[{ columnName: 'password', filteringEnabled: false }]} />
                            <EditingState
                                onCommitChanges={this.commitChanges}
                            />
                            <IntegratedFiltering />
                            <Table />
                            <TableHeaderRow />
                            <TableFilterRow />
                            <TableEditRow />
                            <TableEditColumn
                                showAddCommand
                                showEditCommand
                                showDeleteCommand
                            />
                        </Grid>
                    </BlockUi>
                </MenuAppBar>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    open={errorMessage > 0}
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