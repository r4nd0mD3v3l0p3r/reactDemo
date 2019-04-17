import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuAppBar from './MenuAppBar';
import { withCookies } from 'react-cookie';
import { LOGIN_COOKIE } from '../actions';
import compose from 'recompose/compose';

const styles = theme => ({
});

class Home extends React.Component {
    render() {
        const { cookies } = this.props;
        const logged = cookies.get(LOGIN_COOKIE) !== undefined;

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

Home.propTypes = {
    classes: PropTypes.object.isRequired
};
export default compose(withStyles(styles, { name: 'Home' }), withCookies)(Home);