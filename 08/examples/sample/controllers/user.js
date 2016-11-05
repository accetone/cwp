module.exports = (userService, promiseHandler) => {
    const BaseController = require('./base');

    Object.setPrototypeOf(UserController.prototype, BaseController.prototype);

    function UserController(userService, promiseHandler) {
        BaseController.call(this, userService, promiseHandler);

        this.routes['/create'] = undefined;
        this.routes['/grant'] = [{ method: 'post', cb: grant }];
        this.routes['/revoke'] = [{ method: 'post', cb: revoke }];

        this.registerRoutes();

        return this.router;

        function grant(req, res) {
            promiseHandler(res,
                userService.grant(req.body.userId, req.body.roleId)
            );
        }

        function revoke(req, res) {
            promiseHandler(res,
                userService.revoke(req.body.userId, req.body.roleId)
            );
        }
    }

    return new UserController(userService, promiseHandler);
};