const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIo = require('socket.io');
const axios = require('axios');


const index = require('./routes');

const app = express();
app.use('/', index);
app.use(cors());


const server = http.createServer(app);
const io = socketIo(server); // < Interesting!

const getApiAndEmit = 'TODO';

module.exports = app;
