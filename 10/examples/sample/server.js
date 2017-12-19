const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const errors = require('./helpers/errors');

const PostsService = require('./services/posts');
const UsersService = require('./services/users');
const RolesService = require('./services/roles');
const AuthenticationService = require('./services/authentication');
const AuthorizationService = require('./services/authorization');
const CacheService = require('./services/cache');

module.exports = (db, config) => {
    const app = express();

    // Services
    const postsService = new PostsService(db.posts, errors);
    const usersService = new UsersService(db.users, db.roles, errors);
    const rolesService = new RolesService(db.roles, errors);
    const authenticationService = new AuthenticationService(db.users, db.roles, errors);
    const authorizationService = new AuthorizationService(db.roles, errors);
    const cacheService = new CacheService();

    // Controllers
    const logger = require('./global-controllers/logger');
    const authenticator = require('./global-controllers/authenticator')(usersService, config);
    const authorizator = require('./global-controllers/authorizator')(authorizationService);
    const cache = require('./global-controllers/cache')(cacheService);
    const error = require('./global-controllers/error');

    const apiController = require('./controllers/api')(
        postsService,
        usersService,
        rolesService,
        authenticationService,
        cacheService,
        config,
    );

    // Mounting
    app.use(express.static('public'));
    app.use(cookieParser(config.cookie.key));
    app.use(bodyParser.json());

    app.use('/api', logger);
    app.use('/api', authenticator);
    app.use('/api', authorizator);
    app.use('/api', cache);
    app.use('/api', apiController);
    app.use('/api', error);

    return app;
};