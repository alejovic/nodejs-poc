const logger = require('../config/logger');
const userSchema = require('./db/orm/schema/schema.sequelize');

const userModel = userSchema.schema.user;

userSchema.findAll = async () => {
    logger.debug('user.mode.sequelize.findAll -> start');
    console.log(userModel);
    return userModel.findAll();
};

userSchema.findById = async(id) => {
    logger.debug('user.mode.sequelize.findById -> start');
    return userModel.findByPk(id);
}

userSchema.create = async(user) => {
    logger.debug('user.mode.sequelize.create -> start >>' + user);
    return userModel.create(user);
}

userSchema.update = async(id, user) => {
    logger.debug('user.mode.sequelize.update -> start >>' + id);
    return userModel.findByIdAndUpdate(id, user);
}

userSchema.remove = async(id) => {
    logger.debug('user.mode.sequelize.remove -> start >>' + id);
    return userModel.findByIdAndDelete(id);
}

module.exports = userSchema;
