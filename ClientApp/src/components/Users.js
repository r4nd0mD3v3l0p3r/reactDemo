import React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import MenuAppBar from './MenuAppBar';
import PropTypes from "prop-types";
import { loadUsersList } from '../actions';

import {
    FilteringState,
    IntegratedFiltering,
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableFilterRow,
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
              
            ],
            rows: [],
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(loadUsersList());
    }

    render() {
        const { rows, columns } = this.state;
        const { usersList } = this.props;

        return (
            <MenuAppBar>
                <Grid
                    rows={usersList}
                    columns={columns}
                >
                    <FilteringState defaultFilters={[]} />
                    <IntegratedFiltering />
                    <Table />
                    <TableHeaderRow />
                    <TableFilterRow />
                </Grid>
            </MenuAppBar>
        );
    }
}

function mapStateToProps(state) {
    const { store } = state;
    const { usersList } = store.users;

    return { usersList };
}

Users.propTypes = {
    classes: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(Users));