module.exports = (Sequelize, sequelize) => {
    return sequelize.define('posts', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        title: { type: Sequelize.STRING },
        content: Sequelize.STRING,
        date: Sequelize.DATEONLY,
        rating: Sequelize.INTEGER,

        draft: Sequelize.BOOLEAN
    });
};