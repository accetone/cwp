const CrudController = require('./crud');

class AuthController extends CrudController {
    constructor(authenticationService, config) {
        super(authenticationService);

        this.config = config;

        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.logout = this.logout.bind(this);

        this.routes = {
            '/login': [{ method: 'post', cb: this.login }],
            '/register': [{ method: 'post', cb: this.register }],
            '/logut': [{ method: 'post', cb: this.logout }],
        };

        this.registerRoutes();
    }

    async login(req, res) {
        const user = await this.service.login(req.body);

        res.cookie(this.config.cookie.auth, user.id, { signed: true });
        res.json({ success: true });
    }

    async register(req, res) {
        const user = await this.service.register(req.body);

        res.cookie(this.config.cookie.auth, user.id, { signed: true });
        res.json({ success: true });
    }

    async logout(req, res) {
        res.cookie(this.config.cookie.auth, '');
        res.json({ success: true });
    }
}

module.exports = (authenticationService, config) => {
    const controller = new AuthController(
        authenticationService,
        config
    );

    return controller.router;
};