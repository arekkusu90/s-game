'use strict';

const express = require('express');
const game = require('./game');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/ping', (req, res) => {
    res.json({message: 'pong'});
});

app.post('/game', (req, res) => {
    if (!('map' in req.body) || !('startRoomId' in req.body) || !('objectsToCollect' in req.body)) {
        return res.status(400).json({message: "Parametri non corretti"});
    }


    let map = req.body.map;
    let startRoomId = req.body.startRoomId;
    let objectsToCollect = req.body.objectsToCollect;

    let path = game.start(map, startRoomId, objectsToCollect);

    let result = path.map(el => ({
        roomId: el.room.id,
        roomName: el.room.name,
        objects: el.collectableListFound.map(c => c.name)
    }));

    res.json(result);
});

module.exports = app;
