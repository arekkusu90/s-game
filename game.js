const printOutput = (path) => {
    let data = path.map(el => {
        let result = {};
        result.roomId = el.room.id;
        result.roomName = el.room.name;
        result.objects = el.collectableListFound.map(c => c.name).join(', ') || 'None';
        return result;
    });

    console.table(data, ['roomId', 'roomName', 'objects']);
};


const start = (map, startRoomId, objectList) => {
    let roomList = map.rooms || [];
    let startRoom = roomList.find(r => r.id === startRoomId);

    // @TODO: cosa facciamo se la stanza di partenza non è nella mappa?
    if (!startRoom) {
        console.log('La stanza di partenza non è presente nella mappa');
        return [];
    }

    let path = [];
    let visitedMap = {};
    let collectableList = objectList.map(objectName => ({
        name: objectName,
        collected: false,
        room: null,
        object: null,
    }));

    // Eseguiamo una ricerca in profondità del grafo delle stanze
    function dfsRecursive(roomId) {
        // Se abbiamo raccolto tutti gli oggetti non facciamo più nulla
        if (collectableList.every(c => c.collected)) return;
        // Guardia di sicurezza nel caso in cui non venga passato l'id della stanza,
        // ma questa casistica non dovrebbe mai presentarsi
        if (!roomId) return null;

        let currentRoom = roomList.find(r => r.id === roomId);
        let collectableListFound = [];

        // Per ogni oggetto nella stanza controlliamo se è tra quelli da collezionare.
        // Se si tratta di un oggetto da raccogliere allora lo aggiungiamo all'elenco
        // degli oggetti raccolti in questa stanza e lo segnamo come "raccolto"
        currentRoom.objects.forEach(o => {
            let collectable = collectableList.find(c => !c.collected && c.name === o.name);
            if (collectable) {
                collectableListFound = [...collectableListFound, collectable];
                collectable.collected = true;
                collectable.room = currentRoom;
                collectable.object = o;
            }
        });

        // Segnamo la stanza come visitata ed aggiorniamo la struttura dati
        // che tiene traccia del percorso seguito fino a questo momento
        visitedMap[roomId] = true;
        path.push({room: currentRoom, collectableListFound});

        // Adesso prendiamo le stanze adiacenti presenti nella mappa
        let adjacentRoomIdList = [
            currentRoom.north,
            currentRoom.south,
            currentRoom.west,
            currentRoom.east
        ].filter(id => !!id);

        // Visitiamo tutto il sottografo non visitato di ogni stanza adiacente
        adjacentRoomIdList.forEach(id => {
            // Se abbiamo già visitato la stanza => non facciamo nulla
            if (visitedMap[id]) return;

            // Visitiamo la stanza ed il suo sottografo
            dfsRecursive(id);

            // Se visitando la stanza abbiamo trovato tutti gli oggetti collezionabili
            // => blocchiamo il cammino
            if (collectableList.every(c => c.collected)) {
                // console.log("Abbiamo trovato tutti gli oggetti da collezionare");
                return;
            }

            // Se non abbiamo terminato la raccolta degli oggetti
            // allora dobbiamo tornare nella stanza precedente per accedere a nuove stanze inesplorate
            // Ovviamente, dal momento che raccogliamo tutti gli oggetti che possiamo raccogliere
            // alla prima visita nella stanza, tornando indietro non ci sarà nulla da raccogliere.
            // Per questo motivo ci basta segnalare che stiamo tornando indietro
            // ma non effettuiamo la ricerca nella stanza
            path.push({room: currentRoom, collectableListFound: []});
        });
    }

    dfsRecursive(startRoomId);
    // printOutput(path);

    // Abbiamo visitato tutte le stanze ma non abbiamo trovato gli oggetti da collezionare
    if (!collectableList.every(c => c.collected)) {
        console.log("Non siamo riusciti a raccogliere tutti gli oggetti richiesti");
    }

    return path;
};


module.exports = {
    start,
    printOutput
};
