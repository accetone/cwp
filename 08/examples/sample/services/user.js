module.exports = (userRepository, roleRepository, errors) => {
    const BaseService = require('./base');

    Object.setPrototypeOf(UserService.prototype, BaseService.prototype);

    function UserService(userRepository, roleRepository, errors) {
        BaseService.call(this, userRepository, errors);

        let self = this;

        self.update = update;
        self.grant = grant;
        self.revoke = revoke;

        function update(data) {
            return new Promise((resolve, reject) => {
                let user = {
                    password: data.password,
                    firstname: data.firstname,
                    lastname: data.lastname
                };

                self.baseUpdate(data.id, user)
                    .then(resolve).catch(reject);
            });
        }
        
        function grant(userId, roleId) {
            return new Promise((resolve, reject) => {
                Promise
                    .all([
                        userRepository.findById(userId),
                        roleRepository.findById(roleId)
                    ])
                    .then(([user, role]) => {
                        return user.addRole(role);
                    })
                    .then(() => resolve({ success: true }))
                    .catch(reject);
            });
        }
        
        function revoke(userId, roleId) {
            return new Promise((resolve, reject) => {
                Promise
                    .all([
                        userRepository.findById(userId),
                        roleRepository.findById(roleId)
                    ])
                    .then(([user, role]) => {
                        return user.removeRole(role);
                    })
                    .then(() => resolve({ success: true }))
                    .catch(reject);
            });
        }
    }

    return new UserService(userRepository, roleRepository, errors);
};