const db = require('../postgres.sequelize');
const logger = require("../../../../config/logger");

const schema = {
    user: db.sequelize.define("users_sequelize", {
            name: {
                type: db.DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: db.DataTypes.STRING,
                allowNull: false
            }
        }
    ),
    product: db.sequelize.define("products_sequelize", {
            description: {
                type: db.DataTypes.STRING,
                allowNull: false
            },
        }
    ),

}

schema.user.hasMany(schema.product);
schema.product.belongsTo(
    schema.user,
    {
        foreignKey: "usersSequelizeId",
        as: "users_sequelize",
    }
);
db.sequelize.sync({force: true})
    .then(() => {
        logger.debug("[Sequelize] Synced db.");
    })
    .catch((err) => {
        logger.error("[Sequelize] Failed to sync db: " + err.message);
    });

module.exports.schema = schema;
