const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    image: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

//module.exports = mongoose.model("User", userSchema);

const userModel = mongoose.model("User", userSchema);

userSchema.findAll = async() => {
    return userModel.find();
};

userSchema.findById = (id, result) => {
    return userModel.findById(id);
}

userSchema.create = (user, result) => {
    return userModel.create(user);
}

userSchema.update = (id, user, result) => {
    return userModel.update(user);
}

userSchema.remove = (id, result) => {
    return userModel.delete(user);
}
