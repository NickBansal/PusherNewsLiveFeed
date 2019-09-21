const axios = require('axios');
const url = require('../newsApi');

const getApiAndEmit = async (socket) => {
    try {
        const res = await axios.get(url);
        socket.emit('FromAPI', res.data.articles);
    } catch (error) {
        console.error(`Error: ${error.code}`);
    }
};

module.exports = {
    getApiAndEmit,
};
