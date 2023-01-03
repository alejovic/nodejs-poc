//
// best practice : 
// 1. There is a 'separation of concerns' (controller -> DAL)
// 2. Write Asynchronous Code - Use promises, async/await syntax. 
// reference: https://scoutapm.com/blog/async-javascript
//
const logger = require('../config/logger');
const service = require('../models/user.model.option2');

const findAll = async (req, res) => {
    try {
        logger.debug('user.controller.option2.findAll -> start');
        const result = await service.findAll();
        res.status(200).json({
            payload: result
        });
        logger.debug('user.controller.option2.findAll -> end');
    } catch (error) {
        logger.error(error);
        res.status(500).send(error);
    }
};

const findById = async (req, res) => {
    try {
        logger.debug('user.controller.option2.findById -> start');
        const id = req.params.id;
        const result = await service.findById(id);

        res.status(200).json({
            payload: result
        });
    } catch (error) {
        logger.error(error);
        if(error.code === 404) {
            res.status(404).json({
                payload: 'not found'
            });
            return;
        }

        res.status(500).send(error);
    }
};

const create = async (req, res) => {
    try {
        const user = req.body;
        const result = await service.create(user);
        logger.debug(JSON.stringify(result));
        res.status(200).json({
            status: "success",
            message: "the user has been created."
        });
    } catch (error) {
        logger.debug(JSON.stringify(error));
        res.status(500).json({
            status: "error",
            error: error.message }
        );
    }
};

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const user = req.body;
        const result = await service.update(id, user);
        logger.debug(result);
        res.status(200).json({
            status: "success",
            message: "the user has been updated."
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            error: error.message }
        );
    }
};

const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await service.remove(id);
        logger.debug(result);
        res.status(200).json({
            status: "success",
            message: "the user has been deleted."
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            error: error.message }
        );
    }
};


module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}
