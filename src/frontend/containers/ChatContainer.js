import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
    fetchMessages, clearMessages, deleteMessages, addMessage
} from '../actions/chat';
import { updateUserList } from '../actions/user';
import { errorDisplay, errorHide } from '../actions/error';

import Chat from '../components/Chat';

const styles = () => ({
    container: {
        display: 'flex',
        justifyContent: 'right',
        alignItems: 'center',
        flexDirection: 'row',
    },
    users: {
        height: '100vh',
        width: '25%',
        display: 'flex',
        alignItems: 'right',
        color: 'white',
        justifyContent: 'space-between',
        flexDirection: 'column',
        backgroundColor: '#232e7a'
    },
    usersNone: {
        display: 'none',
    },
    userElement: {
        padding: '2%',
        margin: 10
    },
    userTitle: {
        paddingTop: 20,
        paddingBottom: 20,
        textAlign: 'center',
        borderBottom: '3px solid white',
    },
    buttonDiv: {
        display: 'flex',
        alignSelf: 'center',
        flexDirection: 'column'
    },
    titleWithButton: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    inputWithButton: {
        flexShrink: 0,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        margin: 15
    },
    inputWithHelper: {
        display: 'flex',
        flexDirection: 'column',
        width: '75%'
    },
    big: {
        margin: 5,
        fontSize: 30
    },
    msg: {
        flexGrow: 1,
        overflowY: 'scroll',
    },
    singleMessage: {
        margin: 7
    },
    dummyDiv: { 
        float:"left", 
        clear: "both" 
    },
    messages: {
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'right',
        justifyContent: 'space-between',
        flexDirection: 'column'
    },
    marginBig: {
        marginTop: 30,
        marginBottom: 30
    },
    buttonLeave: {
        margin: 15,
        width: '23%',
        maxHeight: 36
    },
    send: {
        alignSelf: 'flex-end',
        width: '23%'
    },
    red: {
        color: 'red'
    },
    white: {
        color: 'white',
        border: '1px solid white',
        margin: 2
    }
});

function mapStateToProps(state) {
    return {
        room: state.join.room,
        messages: state.chat.messages,
        username: state.user.userInfo.username,
        users: state.user.userList,
        errorType: state.error.errorType,
        errorMessage: state.error.errorMessage
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchMessages: room => dispatch(fetchMessages(room)),
        addMessage: msg => dispatch(addMessage(msg)),
        clearMessages: () => dispatch(clearMessages()),
        deleteMessages: room => dispatch(deleteMessages(room)),
        handleError: error => dispatch(errorDisplay(error)),
        errorHide: () => dispatch(errorHide()),
        updateUserList: users => dispatch(updateUserList(users)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Chat));
