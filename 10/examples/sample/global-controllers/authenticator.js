const wrap = require('../helpers/wrap');

module.exports = (usersService, config) => wrap(async (req, res, next) => {
    let userId = req.signedCookies[config.cookie.auth];

    if (userId) {
        req.user = await usersService.get(userId);
    }

    next();
});