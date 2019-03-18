module.exports = (Sequelize, sequelize) => {
  return sequelize.define('pizzas', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    name: Sequelize.STRING,
    colories: Sequelize.DOUBLE,
  });
};