const wrap = require('../helpers/wrap');

module.exports = (authorizationService) => wrap(async (req, res, next) => {
    await authorizationService.checkPermissions(req.user, req.path);

    next();
});