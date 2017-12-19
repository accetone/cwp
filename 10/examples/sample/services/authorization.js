const permissions = {
    '/posts/create': 'user',
    '/posts/update': 'user',
    '/posts/delete': 'user',

    '/users': 'administrator',
    '/users/update': 'administrator',
    '/users/delete': 'administrator',
    '/users/grant': 'administrator',
    '/users/revoke': 'administrator',

    '/roles': 'administrator',
    '/roles/create': 'administrator',
    '/roles/delete': 'administrator'
};

class AuthorizationService {
    constructor(rolesRepository, errors) {
        this.rolesRepository = rolesRepository;
        this.errors = errors;
    }

    async checkPermissions(user, route) {
        if (!permissions[route]) {
            return;
        }

        if(!user) {
            throw this.errors.accessDenied;
        }

        const role = await this.rolesRepository.findOne({
            where: {
                name: permissions[route]
            }
        });

        const hasRole = await user.hasRole(role);

        if (!hasRole) {
            throw this.errors.accessDenied;
        }
    }
}

module.exports = AuthorizationService;