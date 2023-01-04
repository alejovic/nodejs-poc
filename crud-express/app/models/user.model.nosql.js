const logger = require('../config/logger');
const mongoose = require('./nosql');
const userSchema = require("./user.model.nosql");

const userModel = mongoose.model("User", userSchema);

userSchema.findAll = async () => {
    logger.debug('user.mode.nosql.findAll -> start');
    return userModel.find();
};

userSchema.findById = async(id) => {
    logger.debug('user.mode.nosql.findById -> start');
    return userModel.findById(id);
}

userSchema.create = async(user) => {
    logger.debug('user.mode.nosql.create -> start >>' + user);
    return userModel.create(user);
}

userSchema.update = async(id, user) => {
    logger.debug('user.mode.nosql.update -> start >>' + id);
    return userModel.findByIdAndUpdate(id, user);
}

userSchema.remove = async(id) => {
    logger.debug('user.mode.nosql.remove -> start >>' + id);
    return userModel.findByIdAndDelete(id);
}

module.exports = userSchema;
