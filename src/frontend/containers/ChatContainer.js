import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { fetchMessages, deleteMessages } from '../actions/chat';
import { fetchCurrentRoom, leaveRoom } from '../actions/join';

import Chat from '../components/Chat';

const styles = () => ({
    big: {
        fontSize: '40px'
    }
});

function mapStateToProps(state) {
    return {
        room: state.join.room,
        messages: state.chat.messages,
        username: state.user.username,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchCurrentRoom: () => dispatch(fetchCurrentRoom()),
        fetchMessages: () => dispatch(fetchMessages()),
        deleteMessages: () => dispatch(deleteMessages()),
        leaveRoom: () => dispatch(leaveRoom()),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Chat));
