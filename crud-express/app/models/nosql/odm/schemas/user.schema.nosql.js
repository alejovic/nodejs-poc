const mongoose = require("../mongoose");
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

module.exports = mongoose.model("User", userSchema);
