const express = require('express');

const wrap = require('../helpers/wrap');

class CrudController {
    constructor(service) {
        this.service = service;

        this.readAll = this.readAll.bind(this);
        this.read = this.read.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);

        this.router = express.Router();
        this.routes = {
            '/': [{ method: 'get', cb: this.readAll }],
            '/:id': [{ method: 'get', cb: this.read }],
            '/create': [{ method: 'post', cb: this.create }],
            '/update': [{ method: 'post', cb: this.update }],
            '/delete': [{ method: 'post', cb: this.delete }]
        };
    }

    async readAll(req, res) {
        res.json(
            await this.service.readChunk(req.params)
        );
    }

    async read(req, res) {
        res.json(
            await this.service.read(req.params.id)
        );
    }

    async create(req, res) {
        res.json(
            await this.service.create(req.body)
        );
    }

    async update(req, res) {
        res.json(
            await this.service.update(req.body)
        );
    }

    async delete(req, res) {
        res.json(
            await this.service.delete(req.body.id)
        );
    }

    registerRoutes() {
        Object.keys(this.routes).forEach(route => {
            let handlers = this.routes[route];

            if (!handlers || !Array.isArray(handlers)) return;

            for (let handler of handlers) {
                this.router[handler.method](route, wrap(handler.cb));
            }
        });
    }
}

module.exports = CrudController;