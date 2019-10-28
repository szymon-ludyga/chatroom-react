import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Button, Typography, TextField, FormHelperText, Grid
} from '@material-ui/core';
import _ from 'lodash';
import { routes } from '../routing/routes';
import WebSocket from '../websockets/WebSocket';
import ErrorModal from '../common/ErrorModal';

const throttled = method => _.throttle(method, { trailing: true, leading: true });

export default class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messageCount: 0,
            message: '',
            roomName: this.props.match.params.room,
            screenWidth: window.innerWidth,
        };

        this.throttledRefreshToken = throttled(props.refreshToken);

        this._socket = new WebSocket();
    }

    componentDidMount() {
        this._socket.onMessage('new-message', (res) => {
            this.props.addMessage(res);
            this._scrollToBottom();
        });
        this._socket.onMessage('error-message', (res) => {
            this.props.handleError({ errorType: res.type, errorMessage: res.message });
        });
        this._socket.onMessage('update-user-list', (users) => {
            this.props.updateUserList(users);
        });
        this._socket.emitMessage('join-room', {
            user: this.props.username, room: this.state.roomName
        });
        this._scrollToBottom();
        window.addEventListener('resize', () => this._handleResize());
        setInterval(() => this.throttledRefreshToken(), 15 * 60 * 1000);
    }

    componentWillUnmount() {
        this.props.clearMessages();
        this._socket.close();
        window.removeEventListener('resize', this._handleResize);
    }

    _handleResize = () => {
        this.setState({
            screenWidth: window.innerWidth
        });
    }

    _scrollToBottom = () => {
        this.messagesEnd.scrollIntoView();
    }

    _delete = () => {
        this.props.deleteMessages(this.state.roomName);
    }

    _getPastMessages = () => {
        this.props.fetchMessages(this.state.roomName);
    }

    _leaveRoom = () => {
        this._socket.emitMessage('leave-room', {
            user: this.props.username, room: this.state.roomName
        });
        this.props.history.push(routes.join);
    }

    _onEnter = (e) => {
        if (e.keyCode == 13) {
            this._sendMessage();
        }
    }

    _handleTypeChange = (e) => {
        this.setState({ message: e.target.value });
    }

    _sendMessage = () => {
        console.log(`${this.props.username} emits new message ${this.state.message} to ${this.state.roomName}`);

        this.props.errorHide();
        this._socket.emitMessage('create-message', {
            user: this.props.username,
            room: this.state.roomName,
            message: this.state.message
        });
        this.setState({ messageCount: this.state.messageCount + 1, message: '' });
    };

    render() {
        const { classes, errorMessage, errorType } = this.props;
        const isSmallerScreen = this.state.screenWidth < 700;
        return (
            <>
                <Grid className={classes.container}>
                    <div className={isSmallerScreen ? classes.usersNone : classes.users}>
                        <div>
                            <Typography key={1} className={classes.userTitle} variant="h3">Users</Typography>
                            {this.props.users.map(user => (
                                <Typography className={classes.userElement} variant="h5" key={user._id}>{user.name}</Typography>
                            ))}
                        </div>
                        <div className={classes.buttonDiv}>
                            <Button className={classes.white} onClick={this._delete}>
                                Delete Messages
                            </Button>

                            <Button className={classes.white} onClick={this._getPastMessages}>
                                Get messages history
                            </Button>
                        </div>
                    </div>

                    <div className={classes.messages}>
                        <div className={classes.msg}>
                            <Button variant="outlined" className={isSmallerScreen ? classes.buttonLeaveSmall : classes.buttonLeave} color="secondary" onClick={this._leaveRoom}>
                                Leave room
                            </Button>
                            <div className={isSmallerScreen ? classes.whiteDivSmall : classes.whiteDiv} />
                            <Typography key={2} className={classes.big}>
                                {`Welcome ${this.props.username}!`}
                            </Typography>
                            <Typography key={3}>
                                {`${this.state.messageCount} messages have been emitted`}
                            </Typography>
                            {this.props.messages.map(msg => <Typography className={classes.singleMessage} key={msg._id}>{`${msg.user} (${msg.timestamp}): ${msg.message}`}</Typography>)}
                            <div
                              className={classes.dummyDiv}
                                ref={(el) => { this.messagesEnd = el; }}
                            />
                        </div>
                        <div className={classes.inputWithButton}>
                            <div className={classes.inputWithHelper}>
                                <TextField
                                    autoFocus
                                    error={errorType === 'send-message-error'}
                                    onKeyDown={this._onEnter}
                                    onChange={this._handleTypeChange}
                                    value={this.state.message}
                                    placeholder="new message..."
                                />
                                {errorType === 'send-message-error'
                                    && <FormHelperText className={classes.red}>{errorMessage}</FormHelperText>
                                }
                            </div>
                            <Button className={classes.send} onClick={this._sendMessage} variant="contained" color="primary">
                                Send
                            </Button>
                        </div>
                    </div>
                </Grid>
                {(errorType === 'user-error' || errorType === 'message-error' || errorType === 'token')
                    && (
                        <ErrorModal
                          message={errorMessage}
                          onSubmit={this.props.errorHide}
                        />
                    )}
            </>
        );
    }
}


Chat.propTypes = {
    classes: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,
    deleteMessages: PropTypes.func.isRequired,
    fetchMessages: PropTypes.func.isRequired,
};
