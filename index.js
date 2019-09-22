const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIo = require('socket.io');
const { getApiAndEmit } = require('./apiCalls');
const { ukURL, usURL } = require('./newsApi');

const port = process.env.PORT || 8080;
const index = require('./routes');

const app = express();
app.use('/', index);
app.use(cors());


const server = http.createServer(app);
const io = socketIo(server);

let interval;

io.on('connection', (socket) => {
    console.log('New client connected');
    clearInterval(interval);

    getApiAndEmit(socket, ukURL);

    interval = setInterval(
        () => getApiAndEmit(socket, ukURL),
        5000,
    );

    socket.on('sendCountry', (response) => {
        clearInterval(interval);

        getApiAndEmit(socket, usURL);

        interval = setInterval(
            () => getApiAndEmit(socket, usURL),
            5000,
        );
        // io.emit('fromAPI', response);
    });

    socket.on('disconnect', () => console.log('Client disconnected'));
});

server.listen(port, () => {
    console.log(`Listening on server ${port} - http://localhost:${port}/`);
});

module.exports = app;
