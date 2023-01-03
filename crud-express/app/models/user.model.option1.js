const logger = require('../config/logger');
const dbAccess = require('./db');

// Make sure you don’t pass any web layer objects (i.e. req, res, headers, etc) into your services. 
// Instead, unwrap any values like URL parameters, header values, body data, etc 
// before dispatching to the service layer.

// having sad that this is considered a bad practice since we are mixing contexts.
// check implementation user.service.option2.js

const findAll = (req, res) => {
    try {
        let sql = 'SELECT * FROM users ';

        dbAccess.query(sql, (err, data) => {
            if (err) throw err;

            res.status(200).json({
                err: null,
                users: data.rows,
            })
        })
    } catch (error) {
        res.status(500).json({
            err: error.mean,
        });
    }
};

const findById = (req, res) => {
    let sql = 'SELECT * FROM users WHERE id=' + req.params.id;
    logger.debug(sql);

    logger.debug('Not supported yet.' + req)
    res.status(200).json({
        info: 'Not supported yet'
    });
};

const create = (req, res) => {
    logger.debug('Not supported yet.' + req)
    res.status(201).json({
        info: 'Not supported yet'
    });
};

const update = (req, res) => {
    logger.debug('Not supported yet.' + req)
    res.status(200).json({
        info: 'Not supported yet'
    });
};

const remove = (req, res) => {
    logger.debug('Not supported yet.' + req)
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
