const CrudController = require('./crud');

class RolesController extends CrudController {
    constructor(rolesService) {
        super(rolesService);

        this.routes['/update'] = undefined;

        this.registerRoutes();
    }
}

module.exports = (rolesService) => {
    const controller = new RolesController(rolesService);

    return controller.router;
};