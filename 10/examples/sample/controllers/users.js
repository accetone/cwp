const CrudController = require('./crud');

class UsersController extends CrudController {
    constructor(usersService) {
        super(usersService);

        this.grant = this.grant.bind(this);
        this.revoke = this.revoke.bind(this);

        this.routes['/create'] = undefined;
        this.routes['/grant'] = [{ method: 'post', cb: this.grant }];
        this.routes['/revoke'] = [{ method: 'post', cb: this.revoke }];

        this.registerRoutes();
    }

    async grant(req, res) {
        await this.service.grant(req.body.userId, req.body.roleId);

        res.json({ success: true });
    }

    async revoke(req, res) {
        await this.service.revoke(req.body.userId, req.body.roleId);

        res.json({ success: true });
    }
}

module.exports = (usersService) => {
    const controller = new UsersController(usersService);

    return controller.router;
};