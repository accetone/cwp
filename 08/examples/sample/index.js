const express = require('express');
const Sequelize = require('sequelize');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const errors = require('./utils/errors');
const config = require('./config');

const dbcontext = require('./context/db')(Sequelize, config);

const postService = require('./services/post')(dbcontext.post, errors);
const userService = require('./services/user')(dbcontext.user, dbcontext.role, errors);
const roleService = require('./services/role')(dbcontext.role, errors);
const authService = require('./services/auth')(dbcontext.user, dbcontext.role, errors);
const cacheService = require('./services/cache');

const apiController = require('./controllers/api')(postService, userService, roleService,
    authService, cacheService, config);

const logger = require('./utils/logger');
const auth = require('./utils/auth')(authService, config, errors);
const cache = require('./utils/cache')(cacheService);

const app = express();

app.use(express.static('public'));
app.use(cookieParser(config.cookie.key));
app.use(bodyParser.json());

app.use('/api', logger);
app.use('/api', auth);
app.use('/api', cache);
app.use('/api', apiController);

dbcontext.sequelize
    .sync()
    .then(() => {
        app.listen(3000, () => console.log('Running'));
    })
    .catch((err) => console.log(err));