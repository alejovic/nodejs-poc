//
// best practice : 
// 1. There is a 'separation of concerns' (controller -> DAL)
// 2. It can be improved by using Asynchronous Code.
// @see approach: user.controller.option2.js 
//
const logger = require('../config/logger');
const service = require('../models/user.model.option3');

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    logger.debug('user.controller.option3.findAll -> start');

    service.findAll((data) => {
        if (data.status === 'error') {
            res.status(500).send({
                status: 'error',
                error: data.error,
            })
        } else res.send({
            status: 'success',
            payload: data.rows
        });
    });

};

// Find a single User with a id
exports.findById = (req, res) => {
    logger.debug('user.controller.option3.findById -> start');

    const id = req.params.id;
    service.findById(id, (data) => {
        if (data.status === 'error') {
            res.status(500).send({
                status: 'error',
                error: data.error,
            })
        } else res.send({
            status: 'success',
            payload: data.rows
        });
    });

};

// Create and Save a new User
exports.create = (req, res) => {
    logger.debug('user.controller.option3.create -> start');

    const user = req.body;
    service.create(user, (data) => {
        if (data.status === 'error') {
            res.status(500).send({
                status: 'error',
                error: data.error,
            })
        } else res.send({
            status: 'success',
            payload: data.rows
        });
    });
};

// Update a User identified by the id in the request
exports.update = (req, res) => {
    logger.debug('user.controller.option3.update -> start');

    const id = req.params.id;
    const user = req.body;
    service.update(id, user, (data) => {
        if (data.status === 'error') {
            res.status(500).send({
                status: 'error',
                error: data.error,
            })
        } else res.send({
            status: 'success',
            payload: data.rows
        });
    });

};

// Delete a User with the specified id in the request
exports.remove = (req, res) => {
    logger.debug('user.controller.option3.delete -> start');

    const id = req.params.id;
    service.update(id, (data) => {
        if (data.status === 'error') {
            res.status(500).send({
                status: 'error',
                error: data.error,
            })
        } else res.send({
            status: 'success',
            payload: data.rows
        });
    });

};
