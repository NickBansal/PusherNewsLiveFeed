const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIo = require('socket.io');
const moment = require('moment');

// const { getApiAndEmit, url, lookup } = require('./liveNewsFeed');

const port = process.env.PORT || 8080;
const index = require('./routes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use('/', index);
app.use(cors());

io.on('connection', (socket) => {
    console.log('New client connected');

    let interval;
    clearInterval(interval);

    // getApiAndEmit(socket, url('gb'));

    // interval = setInterval(
    //     () => getApiAndEmit(socket, url('gb')),
    //     5000,
    // );


    socket.on('sendMessage', (message) => {
        io.emit('message', {
            message,
            time: moment().format('HH:mm a'),
        });
    });

    socket.on('joinRoom', ({ username, room }) => {
        socket.join(room);

        socket.emit('message', {
            message: 'Welcome!',
            time: undefined,
            username,
            room,
        });

        socket.broadcast.to(room).emit('message', {
            message: `${username} has now joined...`,
            time: undefined,
            username,
            room,
        });
    });

    // socket.on('sendCountry', (response) => {
    //     clearInterval(interval);
    //     const countrySelector = lookup[response];

    //     getApiAndEmit(socket, url(countrySelector));
    //     interval = setInterval(
    //         () => getApiAndEmit(socket, url(countrySelector)),
    //         5000,
    //     );
    // });

    socket.on('disconnect', () => {
        io.emit('message', { message: 'A user has left', time: undefined });
        console.log('Client disconnected');
    });
});

io.listen(port, () => {
    console.log(`Listening on server ${port} - http://localhost:${port}/`);
});

module.exports = app;
