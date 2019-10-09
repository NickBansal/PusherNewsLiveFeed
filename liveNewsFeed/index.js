const axios = require('axios');
const url = require('./newsApi');
const lookup = require('./countryLookup');

const getApiAndEmit = async (socket, countryUrl) => {
    try {
        const { data } = await axios.get(countryUrl);
        socket.emit('LiveNewsFeed', data.articles);
    } catch (error) {
        console.error(`Error: ${error.response.data.message}`);
    }
};

module.exports = {
    getApiAndEmit,
    url,
    lookup,
};
