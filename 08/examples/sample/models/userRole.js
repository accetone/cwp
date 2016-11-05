module.exports = (Sequelize, sequelize) => {
    return sequelize.define('userRoles', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    });
};