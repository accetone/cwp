const express = require('express');

module.exports = (
    postsService,
    usersService,
    rolesService,
    authenticationService,
    cacheService,
    config,
) => {
    const router = express.Router();

    const postsController = require('./posts')(postsService, cacheService);
    const usersController = require('./users')(usersService);
    const rolesController = require('./roles')(rolesService);
    const authController = require('./auth')(authenticationService, config);

    router.use('/posts', postsController);
    router.use('/users', usersController);
    router.use('/roles', rolesController);
    router.use('/auth', authController);

    return router;
};