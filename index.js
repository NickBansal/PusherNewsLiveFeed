const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIo = require('socket.io');
const { getApiAndEmit } = require('./apiCalls');
const url = require('./newsApi');
const lookup = require('./countryLookup');

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

    getApiAndEmit(socket, url('gb'));

    interval = setInterval(
        () => getApiAndEmit(socket, url('gb')),
        5000,
    );

    socket.on('sendCountry', (response) => {
        clearInterval(interval);

        const countrySelector = lookup[response];

        getApiAndEmit(socket, url(countrySelector));

        interval = setInterval(
            () => getApiAndEmit(socket, url(countrySelector)),
            5000,
        );
    });

    socket.on('disconnect', () => console.log('Client disconnected'));
});

io.listen(port, () => {
    console.log(`Listening on server ${port} - http://localhost:${port}/`);
});

module.exports = app;
