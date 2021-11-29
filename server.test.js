const app = require('./server');
const {EXAMPLE_1, EXAMPLE_2} = require('./examples');
const supertest = require('supertest');
const request = supertest(app);


test('Ping endpoint', async () => {
    const res = await request.get('/ping');

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('pong');
});

describe("Game endpoint", () => {
    test('It must exist', async () => {
        let res = await request.post('/game').send({});
        expect(res.status).not.toBe(404);
    });

    test('Bad request', async () => {
        let res = await request.post('/game').send({});
        expect(res.status).toBe(400);

        res = await request.post('/game').send({map: []});
        expect(res.status).toBe(400);

        res = await request.post('/game').send({startRoomId: 1});
        expect(res.status).toBe(400);

        res = await request.post('/game').send({objectsToCollect: []});
        expect(res.status).toBe(400);

        res = await request.post('/game').send({map: [], startRoomId: 1});
        expect(res.status).toBe(400);

        res = await request.post('/game').send({map: [], objectsToCollect: []});
        expect(res.status).toBe(400);

        res = await request.post('/game').send({startRoomId: 1, objectsToCollect: []});
        expect(res.status).toBe(400);

        res = await request.post('/game').send({map: [], startRoomId: 1, objectsToCollect: []});
        expect(res.status).toBe(200);
    });

    test('Example 1', async () => {
        let res = await request.post('/game').send({
            map: EXAMPLE_1.map,
            startRoomId: EXAMPLE_1.startRoomId,
            objectsToCollect: EXAMPLE_1.objectsToCollect
        });

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(6);
    });

    test('Example 2', async () => {
        let res = await request.post('/game').send({
            map: EXAMPLE_2.map,
            startRoomId: EXAMPLE_2.startRoomId,
            objectsToCollect: EXAMPLE_2.objectsToCollect
        });

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(9);
    });
});

