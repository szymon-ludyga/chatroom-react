// const path = require('path');
// const http = require('http');
// const express = require('express');
// const socketIO = require('socket.io');
// // const { generateMessage } = require('./utils/message');
// // const { isRealString } = require('./utils/validation');
// // const { Users } = require('./utils/users');
// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server);

// // const WebSocket = require('ws');

// // const wss = new WebSocket.Server({ port: 3000 });
// // console.log(wss);

// // const users = new Users();

// app.use(express.static('dist'));

// // case insesitive, unique names, chatrooms displayed

// io.on('connection', (socket) => {
//     console.log('New user connected');

//     socket.on('connect', () => {
//         console.log("connect");
//         // const user = users.getUser(socket.id);

//         // if (user && isRealString(message.text)) {
//         //     // io.emit - emits event to every connection
//         //     // io.to(roomName).emit() - emit to every connection in room
//         //     io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
//         // }
//         // callback();
//     });

//     // socket.on('join', (params, callback) => {
//     //     if (!isRealString(params.name) || !isRealString(params.room)) {
//     //         return callback('Name and room name are required');
//     //     }

//     //     socket.join(params.room);
//     //     users.removeUser(socket.id);
//     //     users.addUser(socket.id, params.name, params.room);

//     //     io.to(params.room).emit(
//     //         'update-user-list',
//     //         users.getUsersList(params.room)
//     //     );

//     // socket.emit - emits event to single connection
//     // socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));

//     // socket.broadcast.emit - emits event to every connection but the socket itself
//     // socket.broadcast
//     //     .to(params.room)
//     //     .emit(
//     //         'newMessage',
//     //         generateMessage('Admin', `${params.name} has joined.`)
//     //     );

//     // callback();
//     // });

//     socket.on('message', (message) => {
//         console.log(message);
//         // const user = users.getUser(socket.id);

//         // if (user && isRealString(message.text)) {
//         //     // io.emit - emits event to every connection
//         //     // io.to(roomName).emit() - emit to every connection in room
//         //     io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
//         // }
//         // callback();
//     });

//     socket.on('disconnect', () => {
//         // const user = users.removeUser(socket.id);
//         // if (user) {
//         //     io.to(user.room).emit('update-user-list', users.getUsersList(user.room));
//         //     io.to(user.room).emit(
//         //         'newMessage',
//         //         generateMessage('Admin', `${user.name} has left the room.`)
//         //     );
//         // }
//         console.log('Client disconnected...');
//     });
// });


// const port = process.env.PORT || 3000;

// app.listen(port, () => console.log(`Listening on port ${port}!`));

const express = require('express');
const moment = require('moment');

const app = express();
const port = 3000;
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const { addMessage } = require('./utils/messageUtils');
const { getUsers } = require('./utils/userUtils');

const { mongoose } = require('./db/mongooseConfig');
const { User } = require('./db/User');
const { Message } = require('./db/Message');

const usersRouter = require('./router/user');
const roomsRouter = require('./router/room');
const messagesRouter = require('./router/message');

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use('/api/rooms', roomsRouter);
app.use('/api/users', usersRouter);
app.use('/api/messages', messagesRouter);

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('join-room', (data) => {
        console.log('room join');
        console.log(data);
        socket.join(data.room);

        io.to(data.room).emit(
            'update-user-list',
            users.getUsers(data.room)
        );

        // socket.emit - emits event to single connection
        socket.emit('new-message', { user: 'Admin', message: 'Welcome to the app' });

        // socket.broadcast.emit - emits event to every connection but the socket itself
        socket.broadcast
            .to(data.room)
            .emit(
                'new-message',
                { user: 'Admin', message: `${data.user} has joined` }
            );
    });

    socket.on('leave-room', (data) => {
        console.log('leaving room');
        console.log(data);
        socket.leave(data.room);
    });

    socket.on('create-message', (data) => {
        console.log('DATA', data);
        try {
            addMessage(data);
            io.to(data.room).emit('new-message', { user: data.user, message: data.message });
        } catch (err) {
            console.log(err);
        }
    });
});

server.listen(port, () => {
    console.log(`## SERVER ON PORT ${port} ##`);
});
