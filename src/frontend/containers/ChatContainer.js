import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
    fetchMessages, clearMessages, deleteMessages, addMessage
} from '../actions/chat';
import updateUserList from '../actions/user';
import { refreshToken, clearUser } from '../actions/login';
import { errorDisplay, errorHide } from '../actions/error';
import changePath from '../actions/status';

import Chat from '../components/Chat';

const styles = () => ({
    errorGrid: {
        marginTop: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
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
    coloredBox: {
        backgroundColor: '#111111',
        color: '#eeeeee',
        margin: '7px 7px 7px auto',
        boxShadow: '-2px 2px 10px rgba(0, 0, 0, .5)',
    },
    plainBox: {
        margin: 7,
        backgroundColor: '#eeeeee',
        boxShadow: '2px 2px 10px rgba(0, 0, 0, .5)',
    },
    messageBox: {
        minWidth: 260,
        width: '40%',
        display: 'flex',
        alignSelf: 'right',
        justifyContent: 'right',
        flexDirection: 'column',
        borderRadius: '4px 4px',
    },
    timestamp: {
        alignSelf: 'center',
        paddingRight: 3,
        fontSize: '80%'
    },
    adminMessage: {
        textAlign: 'center',
        color: '#444444',
        fontSize: '120%',
    },
    singleMessage: {
        fontSize: '120%',
        paddingLeft: 5,
        paddingRight: 5
    },
    dummyDiv: {
        float: 'left',
        clear: 'both'
    },
    whiteDivSmall: {
        position: 'fixed',
        width: '100%',
        height: 60,
        backgroundColor: 'white',
        zIndex: 1
    },
    whiteDiv: {
        position: 'fixed',
        width: '23%',
        height: 60,
        top: 0,
        right: 0,
        backgroundColor: 'white',
        zIndex: 1
    },
    messages: {
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column'
    },
    marginBig: {
        marginTop: 30,
        marginBottom: 30
    },
    buttonLeave: {
        zIndex: 2,
        position: 'fixed',
        top: 15,
        right: 15,
        width: '20%',
        maxHeight: 36
    },
    buttonLeaveSmall: {
        zIndex: 2,
        position: 'fixed',
        top: 15,
        right: 0,
        left: 0,
        margin: '0 auto',
        width: '30%',
        minWidth: 260,
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
        changePath: path => dispatch(changePath(path)),
        fetchMessages: room => dispatch(fetchMessages(room)),
        addMessage: msg => dispatch(addMessage(msg)),
        clearMessages: () => dispatch(clearMessages()),
        deleteMessages: room => dispatch(deleteMessages(room)),
        handleError: error => dispatch(errorDisplay(error)),
        errorHide: () => dispatch(errorHide()),
        updateUserList: users => dispatch(updateUserList(users)),
        refreshToken: () => dispatch(refreshToken()),
        clearUser: () => dispatch(clearUser()),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Chat));
