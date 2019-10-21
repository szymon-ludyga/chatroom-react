import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Button, IconButton, Fab, Typography
} from '@material-ui/core';
import classnames from 'classnames';
import DeleteIcon from "@material-ui/icons/Delete";

import { routes } from '../routing/routes';
import WebSocket from '../websockets/WebSocket';
import InputModal from '../common/InputModal';
import ConfirmModal from '../common/ConfirmModal';

export default class Join extends Component {
    constructor(props) {
        super(props);

        this.state = {
            screenWidth: window.innerWidth,
        };

        this._socket = new WebSocket();
    }

    componentDidMount() {
        this.props.fetchRooms();
        window.addEventListener('resize', () => this._handleResize());
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._handleResize);
    }

    _handleResize = () => {
        this.setState({
            screenWidth: window.innerWidth
        })
    }

    _onRoomSubmit = (room) => {
        this.props.createRoom({
            user: this.props.username, room
        })
    }

    _handleSubmit = (room) => {
        this.props.confirmRoom(room);
        this.props.history.push(`${routes.chat}/${room}`);
    }

    _handleLogout = () => {
        this.props.logout({ username: this.props.username });
        this.props.history.push(routes.login);
    }

    render() {
        const { classes, rooms, confirmDeletedRoom } = this.props;
        const isSmallerScreen = this.state.screenWidth < 600;
        return (
            <>
                <div className={classes.container}>
                        <div className={classnames([classes.roomArea, isSmallerScreen && classes.topMargin])}>
                            <Typography variant='h3'>Join Room</Typography>
                            {rooms.map(room => 
                                <div className={classes.roomList}>
                                    <Fab key={room.name} className={classes.room} variant="extended" onClick={() => this._handleSubmit(room.name)}>
                                        {room.name[0].toUpperCase() + room.name.substring(1)}
                                    </Fab>
                                    <IconButton className={classes.right} onClick={() => this.props.openConfirmModal(room.name)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            )}
                            <Button onClick={this.props.openRoomModal} className={classes.buttonAdd} variant="contained" color="primary">
                                Add room
                            </Button>
                        </div>
                        <div className={isSmallerScreen ? classes.logoutSmall : classes.logout}>
                            <Button onClick={this._handleLogout} className={classes.buttonLogout} variant="outlined" color="secondary">
                                Log Out
                            </Button>
                        </div>
                </div>
                <InputModal 
                    openModal={this.props.roomModal} 
                    closeModal={this.props.closeRoomModal} 
                    message="Type the name of the room"
                    onSubmit={(room) => this._onRoomSubmit(room)}
                    errorType={this.props.errorType}
                    errorMessage={this.props.errorMessage}
                />
                <ConfirmModal 
                    openModal={this.props.confirmModal} 
                    closeModal={this.props.closeConfirmModal}
                    message={`Do you want to delete room: ${confirmDeletedRoom}?`}
                    onSubmit={() => this.props.deleteRoom(confirmDeletedRoom)}
                    onCancel={this.props.closeConfirmModal}
                />
            </>
        );
    }
}


Join.propTypes = {
    rooms: PropTypes.array.isRequired,
    room: PropTypes.string,
    classes: PropTypes.object.isRequired,
    confirmRoom: PropTypes.func.isRequired,
    fetchRooms: PropTypes.func.isRequired,
};
