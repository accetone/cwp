module.exports = (userRepository, roleRepository, errors) => {
    const permissions = {
        '/posts/create': 'user',
        '/posts/update': 'user',
        '/posts/delete': 'user',

        '/users': 'administrator',
        '/users/:id': 'administrator',
        '/users/update': 'administrator',
        '/users/delete': 'administrator',
        '/users/grant': 'administrator',
        '/users/revoke': 'administrator',

        '/roles': 'administrator',
        '/roles/:id': 'administrator',
        '/roles/create': 'administrator',
        '/roles/delete': 'administrator'
    };

    return {
        login: login,
        register: register,
        checkPermissions: checkPermissions
    };

    function login(data) {
        return new Promise((resolve, reject) => {
            userRepository
                .findOne({ where: { email: data.email }, attributes: ['id', 'password'] })
                .then((user) => {
                    if (user == null || user.password !== data.password) {
                        reject(errors.wrongCredentials);
                        return;
                    }

                    resolve(user.id);
                })
                .catch(reject);
        });
    }

    function register(data) {
        return new Promise((resolve, reject) => {
            let user = {
                email: data.email,
                password: data.password,
                firstname: data.firstname,
                lastname: data.lastname
            };

            Promise.all([
                    userRepository.create(user),
                    roleRepository.findOne({ where: { name: 'user' } })
                ])
                .then(([user, role]) => {
                    return user.addRole(role);
                })
                .then(() => resolve({ success: true }))
                .catch(reject);
        });
    }

    function checkPermissions(userId, route) {
        return new Promise((resolve, reject) => {
            if (permissions[route] == undefined) resolve();
            else if (userId == undefined) reject();
            else {
                Promise.all([
                        userRepository.findById(userId),
                        roleRepository.findOne({ where: { name: permissions[route] } })
                    ])
                    .then(([user, role]) => {
                        return user.hasRole(role);
                    })
                    .then((has) => {
                        if (has) resolve();
                        else reject();
                    })
                    .catch(reject);
            }
        });
    }
};