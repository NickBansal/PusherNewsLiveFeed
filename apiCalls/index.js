const axios = require('axios');

const getApiAndEmit = async (socket, url) => {
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
