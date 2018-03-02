module.exports = async function (db) {
  await db.sequelize.sync({force: true});

  await db.pizzas.bulkCreate([
    {name: "Neapolitan", colories: 1000},
    {name: "Sicilian", colories: 1400},
    {name: "Pepperoni", colories: 2200},
    {name: "Mozzarella", colories: 1700},
  ]);

  await db.weapons.bulkCreate([
    {name: "Katana", dps: 79},
    {name: "Nunchucks", dps: 55},
    {name: "Staff", dps: 60},
    {name: "Sai", dps: 70},
  ]);

  await db.turtles.bulkCreate([
    {
      name: "Leo",
      color: "Blue",
      favoritePizzaId: 1,
      weaponId: 1,
    },
    {
      name: "Mikey",
      color: "Orange",
      favoritePizzaId: 1,
      secondFavoritePizzaId: 2,
      weaponId: 2
    },
    {
      name: "Donnie",
      color: "Purple",
      favoritePizzaId: 2,
      weaponId: 3
    },
    {
      name: "Raph",
      color: "Red",
      favoritePizzaId: 3,
      secondFavoritePizzaId: 1,
      weaponId: 4
    },
  ]);
};