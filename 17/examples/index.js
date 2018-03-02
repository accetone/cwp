const Sequelize = require('sequelize');
const Promise = require('bluebird');
const express = require('express');
const graphqlHttp = require('express-graphql');

const config = require('./config');

const db = require('./models')(Sequelize, config);
const schema = require('./schema')(db);

const fillWithTestData = require('./models/test-data');

const app = express();

app.listen = Promise.promisify(app.listen).bind(app);

app.use(graphqlHttp({
  schema,
  pretty: true,
  graphiql: true
}));

(async function () {
  await fillWithTestData(db);

  await app.listen(config.port);

  console.log(`Server running at http://localhost:${config.port}`);
})();
