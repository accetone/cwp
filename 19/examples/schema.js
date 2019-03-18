const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
} = require('graphql');

module.exports = db => {
  const Pizza = new GraphQLObjectType({
    name: 'Pizza',
    fields: {
      id: { type: GraphQLInt },
      name: { type: GraphQLString },
      colories: { type: GraphQLInt },
    },
  });

  const Weapon = new GraphQLObjectType({
    name: 'Weapon',
    fields: {
      id: {type: GraphQLInt},
      name: {type: GraphQLString},
      dps: {type: GraphQLFloat},
    },
  });

  const Turtle = new GraphQLObjectType({
    name: 'Turtle',
    fields: {
      id: { type: GraphQLInt },
      name: { type: GraphQLString },
      color: { type: GraphQLString },
      weapon: {
        type: Weapon,
        resolve: turtle => db.weapons.findById(turtle.weaponId, { raw: true })
      },
      favoritePizza: {
        type: Pizza,
        resolve: turtle => db.pizzas.findById(turtle.favoritePizzaId, { raw: true })
      },
      secondFavoritePizza: {
        type: Pizza,
        resolve: turtle => db.pizzas.findById(turtle.secondFavoritePizzaId, { raw: true })
      },
    },
  });

  const Query = new GraphQLObjectType({
    name: 'TMNT',
    fields: {
      turtles: {
        type: new GraphQLList(Turtle),
        resolve: () => db.turtles.findAll({ raw: true })
      },
      turtle: {
        args: {
          id: { type: GraphQLInt }
        },
        type: Turtle,
        resolve: (obj, args) => db.turtles.findById(args.id, { raw: true })
      },
      weapons: {
        type: new GraphQLList(Weapon),
        resolve: () => db.weapons.findAll({ raw: true })
      },
      pizzas: {
        type: new GraphQLList(Pizza),
        resolve: () => db.pizzas.findAll({ raw: true })
      },
    }
  });

  return new GraphQLSchema({
    query: Query,
  });
};