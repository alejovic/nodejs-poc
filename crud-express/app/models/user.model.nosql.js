const logger = require('../config/logger');
const mongoose = require('./nosql');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: String,
        email: String,
        image: String,
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

//module.exports = mongoose.model("User", userSchema);

const userModel = mongoose.model("User", userSchema);

userSchema.findAll = async () => {
    logger.debug('user.mode.nosql.findAll -> start');
    return userModel.find();
};

userSchema.findById = (id) => {
    logger.debug('user.mode.nosql.findById -> start');
    return userModel.findById(id);
}

userSchema.create = (user) => {
    logger.debug('user.mode.nosql.create -> start >>' + user);
    return userModel.create(user);
}

userSchema.update = (id, user) => {
    logger.debug('user.mode.nosql.update -> start >>' + id);
    return userModel.findByIdAndUpdate(id, user);
}

userSchema.remove = (id) => {
    logger.debug('user.mode.nosql.remove -> start >>' + id);
    return userModel.delete(id);
}

module.exports = userSchema;
