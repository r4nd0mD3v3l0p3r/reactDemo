import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import MenuAppBar from './MenuAppBar';
const styles = theme => ({
});

class Home extends React.Component {
    render() {
        const { logged } = this.props;
        let content;

        if (logged) {
            content = (<div>Welcome</div>);
        }
        else {
            content = (<div></div>);
        }

        return (
            <MenuAppBar>
                {content}
            </MenuAppBar>
        );
    }
}

function mapStateToProps(state) {
    const { store } = state;
    const { logged } = store.login || { logged: false };

    return { logged };
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(Home));
