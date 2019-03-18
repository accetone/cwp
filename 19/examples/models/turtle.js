module.exports = (Sequelize, sequelize) => {
  return sequelize.define('turtles', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    name: Sequelize.STRING,
    color: Sequelize.STRING,
  });
};