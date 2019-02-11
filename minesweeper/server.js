const express = require('express');

const app = express();
const server = app.listen(3499);

app.use(express.static('public'));

console.log('minesweeper server is running');

const socket = require('socket.io');
const io = socket(server);

let online = 0;
let total = 0;

io.on('connect', socket => {
    console.log('new connection: ' + socket.id);
    console.log('online: ' + ++online);
    console.log('total: ' + ++total);

    socket.on('disconnect', () => {
        console.log('disconnection: ' + socket.id);
        console.log('online: ' + --online);
        socket.broadcast.emit('delUser', socket.id);
    });

    socket.on('updateGrid', grid => {
        socket.broadcast.emit('updateGrid', grid);
    });

    socket.on('mouse', user => {
        user.id = socket.id;
        socket.broadcast.emit('mouse', user);
    });
});