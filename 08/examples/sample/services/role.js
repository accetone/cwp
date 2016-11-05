module.exports = (roleRepository, errors) => {
    const BaseService = require('./base');

    Object.setPrototypeOf(RoleService.prototype, BaseService.prototype);

    function RoleService(roleRepository, errors) {
        BaseService.call(this, roleRepository, errors);

        let self = this;

        self.create = create;

        function create(data) {
            return new Promise((resolve, reject) => {
                let user = {
                    name: data.name
                };

                self.baseCreate(user)
                    .then(resolve).catch(reject);
            });
        }
    }

    return new RoleService(roleRepository, errors);
};