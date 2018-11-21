const Sequelize = require('sequelize');

const config = require('./config.json');

const db = require('./context')(Sequelize, config);
const server = require('./server')(db, config);

(async function () {
    await db.sequelize.sync();

    await db.roles.findOrCreate({ where: { name: 'adminstrator' } });
    await db.roles.findOrCreate({ where: { name: 'user' } });

    server.listen(3000, () => console.log('Running'));
})();