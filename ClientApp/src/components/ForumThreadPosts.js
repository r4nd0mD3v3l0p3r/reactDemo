import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import MenuAppBar from './MenuAppBar';
import PropTypes from "prop-types";
import { fetchForumThreadPosts } from '../actions';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import Snackbar from '@material-ui/core/Snackbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";
import Moment from 'react-moment';

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

        this.state = { message: '' };
    }

    componentDidMount() {
        const { dispatch, match } = this.props;
        const threadId = match.params.id;
        dispatch(fetchForumThreadPosts(threadId));
    }

    render() {
        const { message } = this.state;
        const { posts, isFetching, classes } = this.props;

        return (
            <React.Fragment>
                <MenuAppBar>
                    <BlockUi tag="div" blocking={isFetching}>
                        <Button variant="contained" className={classes.button} component={Link} to={'/user'}>
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
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { store } = state;
    const { posts, isFetching } = store.forum;

    return { posts, isFetching };
}

ForumThreadPosts.propTypes = {
    classes: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(ForumThreadPosts));