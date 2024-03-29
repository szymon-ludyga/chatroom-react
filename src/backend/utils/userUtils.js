const { User } = require('../db/User');
const { errorMessages } = require('./errorMessages');

const getUsers = (room, callback) => {
    User.find({ room }).then((res) => {
        callback(res, room);
    /* eslint-disable-next-line no-unused-vars */
    }).catch((err) => {
        throw new Error(errorMessages.userGetError);
    });
};

const checkUserRoom = user => User.findOne({ name: user })
    .then(res => res.room)
    /* eslint-disable-next-line no-unused-vars */
    .catch((err) => {
        throw new Error(errorMessages.userGetError);
    });

const changeUserRoom = (user, room, socketId, callback) => {
    User.findOneAndUpdate({ name: user }, { room, socket_id: socketId })
        .then(res => getUsers(room || res.room, callback))
        /* eslint-disable-next-line no-unused-vars */
        .catch((err) => {
            throw new Error(errorMessages.userUpdateError);
        });
};

const updateRoomBySocketId = (socketId, room, callback) => {
    User.findOneAndUpdate({ socket_id: socketId }, { room })
        .then(res => getUsers(room || res.room, callback))
        /* eslint-disable-next-line no-unused-vars */
        .catch((err) => {
            throw new Error(errorMessages.userUpdateError);
        });
};

module.exports = {
    getUsers, changeUserRoom, checkUserRoom, updateRoomBySocketId
};
