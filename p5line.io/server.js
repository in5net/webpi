const express = require('express');

const app = express();
const server = app.listen(3497);

app.use(express.static('public'));

console.log('p5line.io server is running');

const socket = require('socket.io');
const io = socket(server);

const adminCode = 'robloxglitch';
const creatorCode = 'sockjet';
let online = 0;
let total = 0;

io.on('connect', socket => {
    console.log('new connection: ' + socket.id);
    console.log('online: ' + ++online);
    console.log('total: ' + ++total);

    socket.on('disconnect', () => {
        console.log('disconnection: ' + socket.id);
        console.log('online: ' + --online);
        socket.broadcast.emit('delPlayer', socket.id);
    });

    socket.on('checkCode', code => {
        socket.emit('checkCode', {
            isAdmin: code === adminCode || code === creatorCode,
            isCreator: code === creatorCode
        });
    });

    socket.on('player', data => {
        data.id = socket.id;
        socket.broadcast.emit('player', data);
    });

    socket.on('admin', (command, val) => {
        io.emit('admin', command, val);
    });
});