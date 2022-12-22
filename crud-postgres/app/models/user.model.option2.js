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
        let sql = 'SELECT * FROM users WHERE id=' + id;
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

const create = (req, res) => {
    console.log('Not supported yet.' + req)
    res.status(201).json({
        info: 'Not supported yet'
    });
};

const update = (req, res) => {
    console.log('Not supported yet.' + req)
    res.status(200).json({
        info: 'Not supported yet'
    });
};

const remove = (req, res) => {
    console.log('Not supported yet.' + req)
    res.status(200).json({
        info: 'Not supported yet'
    });
};


module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}