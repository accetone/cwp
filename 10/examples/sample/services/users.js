const Promise = require('bluebird');

const CrudService = require('./crud');

const hash = require('../helpers/hash');

class UsersService extends CrudService {
    constructor(usersRepository, rolesRepository, errors) {
        super(usersRepository, errors);

        this.rolesRepository = rolesRepository;
    }

    async create(data) {
        let user = {
            password: hash.get(data.password),
            firstname: data.firstname,
            lastname: data.lastname
        };

        return super.create(user);
    }

    async update(data) {
        let user = {
            password: data.password && hash.get(data.password),
            firstname: data.firstname,
            lastname: data.lastname
        };

        return super.update(data.id, user);
    }

    async grant(userId, roleId) {
        const [ user, role ] = await Promise.all([
            this.repository.findById(userId),
            this.rolesRepository.findById(roleId),
        ]);

        await user.addRole(role);
    }

    async revoke(userId, roleId) {
        const [ user, role ] = await Promise.all([
            this.repository.findById(userId),
            this.rolesRepository.findById(roleId),
        ]);

        await user.removeRole(role);
    }

    async get(userId) {
        return this.repository.findById(userId);
    }
}

module.exports = UsersService;