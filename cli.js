const game = require('./game');
const inquirer = require('inquirer');
const fs = require('fs');

let mapFilenameList = fs.readdirSync('./maps').filter(file => file.endsWith('.json'));

let mapQuestion = {
    message: 'Which map do you want to test?',
    name: 'map',
    type: 'list',
    choices: mapFilenameList
};

let roomQuestion = {
    message: 'Which is the departure room id?',
    name: 'room',
    type: 'number',
};

let objectsQuestion = {
    message: 'Which items do you want to collect? (use the comma "," as separator)',
    name: 'objects',
    type: 'input',
};


inquirer.prompt([mapQuestion, roomQuestion, objectsQuestion]).then(answers => {
    let {map, room, objects} = answers;

    map = JSON.parse(fs.readFileSync('./maps/' + map, 'utf8'));
    objects = objects.split(',').map(el => el.trim()).filter(el => !!el);

    let path = game.start(map, room, objects);
    game.printOutput(path);
});
