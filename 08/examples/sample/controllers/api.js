const express = require('express');

module.exports = (postService, userService, roleService, authService, cacheService, config) => {
    const router = express.Router();

    const postController = require('./post')(postService, cacheService, promiseHandler);
    const userController = require('./user')(userService, promiseHandler);
    const roleController = require('./role')(roleService, promiseHandler);
    const authController = require('./auth')(authService, config);

    router.use('/posts', postController);
    router.use('/users', userController);
    router.use('/roles', roleController);
    router.use('/auth', authController);

    return router;
};

function promiseHandler(res, promise) {
    promise
        .then((data) => res.json(data))
        .catch((err) => res.error(err));
}