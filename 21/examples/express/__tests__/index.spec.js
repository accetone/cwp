const app = require('../app');
const request = require('supertest')(app);

function getHeroes() {
    return request
        .get('/heroes')
        .expect(200)
        .then((res) => res.body.heroes);
}

function getHero(id) {
    return request
        .get(`/heroes/${id}`)
        .expect(200)
        .then((res) => res.body);
}

function createHero(hero) {
    return request
        .post('/heroes')
        .send(hero)
        .expect(201)
        .then((res) => res.body);
}

function updateHero(hero) {
    return request
        .put(`/heroes/${hero.id}`)
        .send(hero)
        .expect(200)
        .then((res) => res.body)
}

function deleteHero(hero) {
    return request
        .delete(`/heroes/${hero.id}`)
        .expect(200)
        .then((res) => res.body)
}

it('возвращает список героев', async () => {
    expect.assertions(1);

    const heroes = await getHeroes();

    expect(heroes).toContainEqual(
        expect.objectContaining({ name: 'Rick Grimes' })
    );
});

it('возвращает героя', async () => {
    expect.assertions(1);

    const heroes = await getHeroes();
    let daryl = heroes
        .find((hero) => hero.name === 'Daryl Dixon');

    const hero = await getHero(daryl.id);

    expect(hero).toEqual(daryl);
});

it('добавляет героя', async () => {
    expect.assertions(2);

    const glenn = { name: 'Glenn Rhee' };

    const hero = await createHero(glenn);
    const heroes = await getHeroes();

    expect(hero).toMatchObject(glenn);
    expect(heroes).toContainEqual(
        expect.objectContaining(glenn)
    );
});

it('обновляет героя', async () => {
    expect.assertions(1);

    let heroes = await getHeroes();

    let rick = heroes
        .find((hero) => hero.name === 'Rick Grimes');

    rick.status = 'Alive';

    await updateHero(rick);
    heroes = await getHeroes();

    expect(heroes).toContainEqual(
        expect.objectContaining(rick)
    );
});

it('удаляет героя', async () => {
    expect.assertions(1);

    let heroes = await getHeroes();

    let carl = heroes
        .find((hero) => hero.name === 'Carl Grimes');

    await deleteHero(carl);

    heroes = await getHeroes();

    expect(heroes).not.toContainEqual(
        expect.objectContaining(carl)
    );
});
