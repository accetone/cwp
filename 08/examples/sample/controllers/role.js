module.exports = (roleService, promiseHandler) => {
    const BaseController = require('./base');

    Object.setPrototypeOf(RoleController.prototype, BaseController.prototype);

    function RoleController(roleService, promiseHandler) {
        BaseController.call(this, roleService, promiseHandler);

        this.routes['/update'] = undefined;

        this.registerRoutes();

        return this.router;
    }

    return new RoleController(roleService, promiseHandler);
};