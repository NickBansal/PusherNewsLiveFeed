const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIo = require('socket.io');
const { getApiAndEmit } = require('./apiCalls');
const url = require('./newsApi');

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

    getApiAndEmit(socket, url);

    interval = setInterval(
        () => getApiAndEmit(socket, url),
        5000,
    );

    socket.on('sendCountry', (response, callback) => {
        io.emit('fromAPI', response);
        callback(response);
    });

    socket.on('disconnect', () => console.log('Client disconnected'));
});

server.listen(port, () => {
    console.log(`Listening on server ${port} - http://localhost:${port}/`);
});

module.exports = app;
