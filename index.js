const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIo = require('socket.io');
const axios = require('axios');
const url = require('./newsApi');


const index = require('./routes');

const app = express();
app.use('/', index);
app.use(cors());


const server = http.createServer(app);
const io = socketIo(server);

const getApiAndEmit = (socket) => {
    axios.get(url)
        .then((res) => socket.emit('FromAPI', res.data.articles))
        .catch((error) => console.error(`Error: ${error.code}`));
};

let interval;

io.on('connection', (socket) => {
    console.log('New client connected');
    clearInterval(interval);
    interval = setInterval(
        () => getApiAndEmit(socket),
        10000,
    );

    socket.on('disconnect', () => console.log('Client disconnected'));
});

const port = process.env.PORT || 8080;

io.listen(port, () => {
    console.log(`Listening on server ${port} - http://localhost:${port}/`);
});

module.exports = app;
