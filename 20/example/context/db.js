'use strict';

module.exports = (Sequelize, config) => {
    const options = {
        host: config.db.host,
        dialect: config.db.dialect,
        logging: false,
        dialectOptions: {
            ssl: true
        }
    };

    const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, options);

    const Rand = require('../models/rand')(Sequelize, sequelize);

    return {
        rand: Rand,
        sequelize: sequelize
    };
};