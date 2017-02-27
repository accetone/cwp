'use strict';

module.exports = (Sequelize, sequelize) => {
    return sequelize.define('rands', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        value: Sequelize.INTEGER
    });
};