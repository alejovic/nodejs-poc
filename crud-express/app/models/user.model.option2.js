const logger = require('../config/logger');
const dbAccess = require('./db');
const uuid = require('uuid');
const validator = require('./validators/user.joi.validator')

//
// best practice:
// 1. Separation of contexts.
// 2. Uses promises
// 3. Use promises’ error handling support
// 

const findAll = () => {
    logger.debug('user.model.option2.findAll -> start.');
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM users ';
        logger.debug(sql);
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
                logger.debug('user.model.option2.findById -> done.');
            });
    });
};

const findById = (id) => {
    logger.debug('user.model.option2.findById -> start.');
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM users WHERE id=$1';
        logger.debug(sql);
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
                logger.debug(err.message);
                return reject({
                    id: uuid.v1(),
                    status: 'error',
                    error: err.message,
                });
            })
            // then after catch is works like a finally.
            .then(() => {
                logger.debug('user.model.option2.findById -> done.');
            });
    });
};

const create = (user) => {
    logger.debug('user.model.option2.create -> start.');
    return new Promise((resolve, reject) => {
        validator.validateUser(user)
            .then(result => {
                logger.debug('user.model.option2.validateUser -> ');
                logger.debug(JSON.stringify(result));
                let sql = 'INSERT INTO users(name, email) VALUES ($1,$2)';

                logger.debug(sql);
                logger.debug(JSON.stringify(user));
                dbAccess.query(sql, [user.name, user.email], (error, data) => {
                    if (error) {
                        logger.debug('error:', error);
                        return reject({
                            id: uuid.v1(),
                            status: 'error',
                            message: error.message,
                        });
                    }

                    logger.debug('user has been created');
                    return resolve({
                        status: 'success',
                        affectedRows: data.rowCount,
                    });
                })
            }).catch(error => {
            return reject({
                id: uuid.v1(),
                status: 'error',
                message: error.message.details[0].message,
            });
        });
    });
};

const update = (id, user) => {
    logger.debug('user.controller.option2.update -> load');
    return new Promise((resolve, reject) => {
        let sql = 'UPDATE users SET name=$1, email=$2 where id=$3';
        logger.debug(sql);
        logger.debug(user);
        dbAccess.query(sql, [user.name, user.email, id], (error, data) => {
            if (error) {
                logger.debug('error:', error);
                return reject({
                    id: uuid.v1(),
                    status: 'error',
                    message: error.message,
                });
            }

            if (data.rowCount == 0) {
                return reject({
                    id: uuid.v1(),
                    status: 'error',
                    message: 'not found',
                });
            }

            logger.debug('user has been updated');
            return resolve({
                status: 'success',
                affectedRows: data.rowCount,
            });
        });
    });
};

const remove = (id) => {
    logger.debug('user.controller.option2.remove -> load');
    return new Promise((resolve, reject) => {
        let sql = 'DELETE FROM users WHERE id=$1';
        logger.debug(sql);
        logger.debug(id);
        dbAccess.query(sql, [id], (error, data) => {
            if (error) {
                logger.debug('message:', error);
                return reject({
                    id: uuid.v1(),
                    status: 'error',
                    message: error.message,
                });
            }

            if (data.rowCount == 0) {
                return reject({
                    id: uuid.v1(),
                    status: 'error',
                    message: 'not found',
                });
            }

            logger.debug('user has been deleted');
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
