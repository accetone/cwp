module.exports = (Sequelize, sequelize) => {
    return sequelize.define('roles', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name: Sequelize.STRING
    });
};