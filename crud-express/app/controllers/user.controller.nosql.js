//
// best practice : 
// 1. There is a 'separation of concerns' (controller -> DAL)
// 2. Write Asynchronous Code - Use promises, async/await syntax. 
// reference: https://scoutapm.com/blog/async-javascript
//

const service = require('../models/user.model.nosql');

const findAll = async (req, res) => {
    try {
        console.log('user.controller.nosql.findAll -> start');
        const result = await service.findAll();
        res.status(200).json({
            data: result
        });
        console.log('user.controller.nosql.findAll -> end');
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

const findById = async (req, res) => {
    try {
        console.log('user.controller.nosql.findById -> start');
        const id = req.params.id;
        const result = await service.findById(id);
        res.status(200).json({
            data: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

const create = async (req, res) => {
    try {
        const user = req.body;
        const result = await service.create(user);
        res.status(200).json({
            status: "success",
            data: result
        });
    } catch (error) {
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
        await service.update(id, user);
    } catch (error) {
        res.status(500).send(error);
    }
};

const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const user = req.body;
        await service.remove(id,user);
    } catch (error) {
        res.status(500).send(error);
    }
};


module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}
