import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import MenuAppBar from './MenuAppBar';
import PropTypes from "prop-types";
import { loadUser } from '../actions';
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

    componentDidMount() {
        const { dispatch, match } = this.props;

        dispatch(loadUser({ id: match.params.id }));
    }

    render() {
        const { isFetching, user, message } = this.props;

        return (
            <React.Fragment>
                <MenuAppBar>
                    <BlockUi tag="div" blocking={isFetching}>

                    </BlockUi>
                </MenuAppBar>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { store } = state;
    const { user, isFetching, message } = store.user;

    return { user, isFetching, message };
}

User.propTypes = {
    classes: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(User));