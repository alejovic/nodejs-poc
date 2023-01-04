const { Sequelize, DataTypes } = require('sequelize');
const config = require("../../../config/config");
const logger = require("../../../config/logger");

const sequelize = new Sequelize(
    config.get('db.name'),
    config.get('db.user'),
    config.get('db.password'),
    {
        host: config.get('db.host'),
        port:config.get('db.port'),
        dialect: config.get('db.dialect') || 'postgres',

        pool: {
            max: config.get('db.pool.max') || 5,
            min: config.get('db.pool.min') || 0,
            acquire: config.get('db.pool.acquire') || 30000,
            idle: config.get('db.pool.idle') || 10000
        },

        logging: (sql, timing) => {
            logger.debug('[Sequelize] ' + sql);
        }
    });
sequelize.authenticate()
    .then(() => {
        logger.debug('[Sequelize] Connection has been established successfully.');
    })
    .catch((error) => {
        logger.error('[Sequelize] Unable to connect to the database: ', error);
    });

const db = {};

db.Sequelize = Sequelize;
db.DataTypes = DataTypes;
db.sequelize = sequelize;

module.exports = db;


