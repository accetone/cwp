const express = require('express');

function BaseController(service, promiseHandler) {
    let self = this;

    this.registerRoutes = registerRoutes;
    this.router = express.Router();
    this.routes = {
        '/': [{ method: 'get', cb: readAll }],
        '/:id': [{ method: 'get', cb: read }],
        '/create': [{ method: 'post', cb: create }],
        '/update': [{ method: 'post', cb: update }],
        '/delete': [{ method: 'post', cb: del }]
    };

    function readAll(req, res) {
        promiseHandler(res,
            service.readChunk(req.params)
        );
    }

    function read(req, res) {
        promiseHandler(res,
            service.read(req.params.id)
        );
    }

    function create(req, res) {
        promiseHandler(res,
            service.create(req.body)
        );
    }

    function update(req, res) {
        promiseHandler(res,
            service.update(req.body)
        );
    }

    function del(req, res) {
        promiseHandler(res,
            service.delete(req.body.id)
        );
    }

    function registerRoutes() {
        for (let route in self.routes) {
            if (!self.routes.hasOwnProperty(route)) {
                continue;
            }

            let handlers = self.routes[route];

            if (handlers == undefined) continue;

            for (let handler of handlers) {
                self.router[handler.method](route, handler.cb);
            }
        }
    }
}

module.exports = BaseController;