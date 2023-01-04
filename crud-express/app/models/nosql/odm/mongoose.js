const mongoose = require("mongoose");
const logger = require('../../../config/logger');
const config = require("../../../config/config");

const uri = config.get('nosql.mongo_uri');

mongoose.set('strictQuery', true);
mongoose.connect(
    uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) {
            logger.error(err);
        } else {
            logger.debug("Connected to MongoDB -> " + uri);
        }
    }
);


// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error",
    logger.error.bind(console, "MongoDB connection error:"));

module.exports = mongoose;



