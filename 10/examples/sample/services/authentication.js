const Promise = require('bluebird');

const hash = require('../helpers/hash');

class AuthenticationService {
    constructor(usersRepository, rolesRepository, errors) {
        this.usersRepository = usersRepository;
        this.rolesRepository = rolesRepository;
        this.errors = errors;
    }

    async login(data) {
        const user = await this.usersRepository.findOne({
            where: { email: data.email },
            attributes: ['id', 'password']
        });

        if (!user || !hash.isValid(data.password, user.password)) {
            throw this.errors.wrongCredentials;
        }

        return user;
    }

    async register(data) {
        const user = this.usersRepository.build({
            email: data.email,
            password: hash.get(data.password),
            firstname: data.firstname,
            lastname: data.lastname
        });

        const [, role] = await Promise.all([
            user.save(),
            this.rolesRepository.findOne({ where: { name: 'user' } })
        ]);

        await user.addRole(role);

        return user;
    }
}

module.exports = AuthenticationService;