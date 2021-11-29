const {start} = require('./game');
const {EXAMPLE_1, EXAMPLE_2} = require('./examples');

test('Example 1', () => {
    let path = start(EXAMPLE_1.map, EXAMPLE_1.startRoomId, EXAMPLE_1.objectsToCollect);

    // Dovrebbe partire dalla stanza passata in input
    expect(path[0].room.id).toBe(EXAMPLE_1.startRoomId);
    // Dovrebbe fare 6 passi nella mappa
    expect(path.length).toBe(6);

    let objectsCollected = [];
    path.forEach(el =>  {
        el.collectableListFound.forEach(c => {
            objectsCollected.push(c.name)
        });
    });

    // Deve collezionare solo oggetti che sono sati passati in iput
    expect(EXAMPLE_1.objectsToCollect).toEqual(expect.arrayContaining(objectsCollected));
    // Dovrebbe collezionare tutti gli oggetti
    expect(objectsCollected.length).toBe(EXAMPLE_1.objectsToCollect.length);
});

test('Example 2', () => {
    let path = start(EXAMPLE_2.map, EXAMPLE_2.startRoomId, EXAMPLE_2.objectsToCollect);

    // Dovrebbe partire dalla stanza passata in input
    expect(path[0].room.id).toBe(EXAMPLE_2.startRoomId);
    // Dovrebbe fare 9 passi nella mappa
    expect(path.length).toBe(9);

    let objectsCollected = [];
    path.forEach(el =>  {
        el.collectableListFound.forEach(c => {
            objectsCollected.push(c.name)
        });
    });

    // Deve collezionare solo oggetti che sono sati passati in iput
    expect(EXAMPLE_2.objectsToCollect).toEqual(expect.arrayContaining(objectsCollected));
    // Dovrebbe collezionare tutti gli oggetti
    expect(objectsCollected.length).toBe(EXAMPLE_2.objectsToCollect.length);
});
