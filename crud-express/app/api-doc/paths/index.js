const getUsers = require('./api.path.get-users.info');
const getUser = require('./api.path.get-user.info');
const createUser = require('./api.path.create-users.info');
const updateUser = require('./api.path.update-users.info');
const deleteUser = require('./api.path.delete-users.info');

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
