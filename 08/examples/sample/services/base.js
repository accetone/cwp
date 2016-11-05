module.exports = BaseService;

function BaseService(repository, errors) {
    const defaults = {
        readChunk: {
            limit: 10,
            page: 1,
            order: 'asc',
            orderField: 'id'
        }
    };

    let self = this;

    this.readChunk = readChunk;
    this.read = read;
    this.baseCreate = baseCreate;
    this.baseUpdate = baseUpdate;
    this.delete = del;

    function readChunk(options) {
        return new Promise((resolve, reject) => {
            options = Object.assign({}, defaults.readChunk, options);

            let limit = options.limit;
            let offset = (options.page - 1) * options.limit;

            repository
                .findAll({
                    limit: limit,
                    offset: offset,
                    order: [[options.orderField, options.order.toUpperCase()]],
                    raw: true
                })
                .then(resolve).catch(reject);
        });
    }

    function read(id) {
        return new Promise((resolve, reject) => {
            id = parseInt(id);

            if (isNaN(id)) {
                reject(errors.invalidId);
                return;
            }

            repository.findById(id, { raw: true })
                .then((post) => {
                    if (post == null) reject(errors.notFound);
                    else resolve(post);
                })
                .catch(reject);
        });
    }

    function baseCreate(data) {
        return new Promise((resolve, reject) => {
            repository.create(data)
                .then(resolve).catch(reject);
        });
    }

    function baseUpdate(id, data) {
        return new Promise((resolve, reject) => {
            repository.update(data, { where: { id: id }, limit: 1 })
                .then(() => {
                    return self.read(data.id);
                })
                .then(resolve).catch(reject);
        });
    }

    function del(id) {
        return new Promise((resolve, reject) => {
            repository.destroy({ where: { id: id } })
                .then(() => resolve({ success: true }))
                .catch(reject);
        });
    }
}