const express = require('express');

module.exports = (authService, config) => {
    const router = express.Router();

    router.post('/login', (req, res) => {
        authService.login(req.body)
            .then((userId) => {
                res.cookie(config.cookie.auth, userId, { signed: true });
                res.json({ success: true });
            })
            .catch((err) => res.error(err));
    });

    router.post('/register', (req, res) => {
        authService.register(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.error(err));
    });

    router.post('/logout', (req, res) => {
        res.cookie(config.cookie.auth, '');
        res.json({ success: true });
    });

    return router;
};