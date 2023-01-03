const dbAccess = require('./db');
const uuid = require('uuid');

//
// best practice:
// 1. Separation of contexts.
// 2. Uses promises
// 3. Use promises’ error handling support
// 

const findAll = () => {
    console.debug('user.model.option2.findAll -> start.');
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM users ';
        console.debug(sql);
        dbAccess.query(sql)
            .then(data => {
                return resolve({
                    id: uuid.v1(),
                    status: 'success',
                    rows: data.rows,
                });
            })
            .catch(err => {
                return reject({
                    id: uuid.v1(),
                    status: 'error',
                    error: err.message,
                });
            })
            .then(() => {
                console.debug('user.model.option2.findById -> done.');
            });
    });
};

const findById = (id) => {
    console.debug('user.model.option2.findById -> start.');
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM users WHERE id=$1';
        console.debug(sql);
        dbAccess.query(sql, [id])
            .then(data => {
                if (data.rowCount === 0) {
                    return reject({
                        id: uuid.v1(),
                        // add code
                        status: 'error',
                        error: 'not found',
                    });
                }

                return resolve({
                    id: uuid.v1(),
                    status: 'success',
                    rows: data.rows,
                });
            })
            .catch(err => {
                console.log(err.message);
                return reject({
                    id: uuid.v1(),
                    status: 'error',
                    error: err.message,
                });
            })
            // then after catch is works like a finally.
            .then(() => {
                console.debug('user.model.option2.findById -> done.');
            });
    });
};

const create = (user) => {
    console.debug('user.model.option2.create -> start.');
    return new Promise((resolve, reject) => {
        let sql = 'INSERT INTO users(name, email) VALUES ($1,$2)';
        console.debug(sql);
        console.debug(user);
        dbAccess.query(sql, [user.name, user.email], (error, data) => {
            if (error) {
                console.log('error:', error);
                return reject({
                    id: uuid.v1(),
                    status: 'error',
                    error: error.message,
                });
            }

            console.debug('user has been created');
            return resolve({
                status: 'success',
                affectedRows: data.rowCount,
            });
        });
    });
};

const update = (id, user) => {
    console.log('user.controller.option2.update -> load');
    return new Promise((resolve, reject) => {
        let sql = 'UPDATE users SET name=$1, email=$2 where id=$3';
        console.debug(sql);
        console.debug(user);
        dbAccess.query(sql, [user.name, user.email, id], (error, data) => {
            if (error) {
                console.log('error:', error);
                return reject({
                    id: uuid.v1(),
                    status: 'error',
                    error: error.message,
                });
            }

            if (data.rowCount == 0) {
                return reject({
                    id: uuid.v1(),
                    status: 'error',
                    error: 'not found',
                });
            }

            console.debug('user has been updated');
            return resolve({
                status: 'success',
                affectedRows: data.rowCount,
            });
        });
    });
};

const remove = (id) => {
    console.log('user.controller.option2.remove -> load');
    return new Promise((resolve, reject) => {
        let sql = 'DELETE FROM users WHERE id=$1';
        console.debug(sql);
        console.debug(id);
        dbAccess.query(sql, [id], (error, data) => {
            if (error) {
                console.log('error:', error);
                return reject({
                    id: uuid.v1(),
                    status: 'error',
                    error: error.message,
                });
            }

            if (data.rowCount == 0) {
                return reject({
                    id: uuid.v1(),
                    status: 'error',
                    error: 'not found',
                });
            }

            console.debug('user has been deleted');
            return resolve({
                status: 'success',
                affectedRows: data.rowCount,
            });
        });
    });
};


module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}
