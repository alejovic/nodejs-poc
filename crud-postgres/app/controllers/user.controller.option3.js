//
// best practice : 
// 1. There is a 'separation of concerns' (controller -> DAL)
// 2. It can be improved by using Asynchronous Code.
// @see approach: user.controller.option2.js 
//

const service = require('../models/user.model.option3');

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    console.log('user.controller.option3.findAll -> start');

    service.findAll( (data) => {
        if(data.status === 'error'){
            res.status(500).send({
                status: 'error',
                error: data.error,
            })
        }
        else res.send(data);
    });

};

// Find a single User with a id
exports.findById = (req, res) => {
    console.log('user.controller.option3.findById -> start');
};

// Create and Save a new User
exports.create = (req, res) => {
    console.log('user.controller.option3.create -> start');
};

// Update a User identified by the id in the request
exports.update = (req, res) => {
    console.log('user.controller.option3.update -> start');
};

// Delete a User with the specified id in the request
exports.remove = (req, res) => {
    console.log('user.controller.option3.delete -> start');
};
