const controller = require('../controllers/user.controller.option2');
const router = require('express').Router();

// Create a new record
router.post('/', controller.create);

// Retrieve all Notes
router.get('/', controller.findAll)

// Retrieve a single record by Id
router.get('/:id', controller.findById);

// Update a record
router.put('/:id', controller.update);

// Delete a record
router.delete('/:id', controller.remove);

module.exports = router;
