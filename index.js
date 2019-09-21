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
    getApiAndEmit(socket, url);
    clearInterval(interval);
    interval = setInterval(
        () => getApiAndEmit(socket, url),
        5000,
    );

    socket.on('disconnect', () => console.log('Client disconnected'));
});

io.listen(port, () => {
    console.log(`Listening on server ${port} - http://localhost:${port}/`);
});

module.exports = app;
