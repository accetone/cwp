const CrudService = require('./crud');

class RolesService extends CrudService {
    async create(data) {
        let role = {
            name: data.name
        };

        return super.create(role);
    }
}

module.exports = RolesService;