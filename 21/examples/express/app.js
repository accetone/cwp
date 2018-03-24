const express = require('express');
const bodyParser = require('body-parser');

const heroes = [
    { id: Date.now() + 1, name: 'Rick Grimes' },
    { id: Date.now() + 2, name: 'Carl Grimes' },
    { id: Date.now() + 3, name: 'Daryl Dixon' }
];

const app = express();

app.use(bodyParser.json());

app.get('/heroes', (req, res) => {
    res.json({ heroes });
});

app.get('/heroes/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let hero = heroes.find(x => x.id === id);

    res.json(hero);
});

app.post('/heroes', (req, res) => {
    let hero = req.body;

    hero.id = Date.now() + heroes.length;
    heroes.push(hero);

    res.status(201).json(hero);
});

app.put('/heroes/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let index = heroes.findIndex(x => x.id === id);
    let hero = req.body;

    hero.id = id;
    Object.assign(heroes[index], hero);

    res.json(heroes[index]);
});

app.delete('/heroes/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let index = heroes.findIndex(x => x.id === id);
    let hero = heroes[index];

    heroes.splice(index, 1);

    res.json(hero);
});

module.exports = app;