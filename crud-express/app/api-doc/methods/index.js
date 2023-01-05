const getUsers = require('./api.method.get-users.info');
const getUser = require('./api.method.get-user.info');
const createUser = require('./api.method.create-users.info');
const updateUser = require('./api.method.update-users.info');
const deleteUser = require('./api.method.delete-users.info');

module.exports = {
    // users/
    paths: {
        '/': {
            ...getUsers,
            ...createUser
        },
        '/{id}': {
            ...getUser,
            ...updateUser,
            ...deleteUser
        }
    }
}
