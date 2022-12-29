//
// best practice : 
// 1. There is a 'separation of concerns' (controller -> DAL)
// 2. Write Asynchronous Code - Use promises, async/await syntax. 
// reference: https://scoutapm.com/blog/async-javascript
//

const service = require('../models/user.model.nosql');

const findAll = async (req, res) => {
    try {
        console.log('user.controller.option2.findAll -> start');
        const result = await service.findAll();
        res.status(200).json({
            data: result
        });
        console.log('user.controller.option2.findAll -> end');
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

const findById = async (req, res) => {
    try {
        console.log('user.controller.option2.findById -> start');
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
        const id = req.params.id;
        await service.create(id);
    } catch (error) {
        res.status(500).send(error);
    }
};

const update = async (req, res) => {
    try {
        const id = req.params.id;
        await service.update(id);
    } catch (error) {
        res.status(500).send(error);
    }
};

const remove = async (req, res) => {
    try {
        const id = req.params.id;
        await service.remove(id);
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
