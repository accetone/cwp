module.exports = (Sequelize, sequelize) => {
  return sequelize.define('weapons', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    name: Sequelize.STRING,
    dps: Sequelize.INTEGER,
  });
};