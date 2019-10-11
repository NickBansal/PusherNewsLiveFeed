let users = [];

// addUser
const addUser = ({ id, username, room }) => {
    const user = { id, username, room };
    users.push(user);
    return user;
};

// removeUser
const removeUser = (id) => {
    const user = users.find((person) => person.id === id);
    users = users.filter((person) => person.id !== id);
    return user;
};

// getUser
const getUser = (id) => users.find((user) => user.id === id);


// getUsersInRoom
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom,
};
