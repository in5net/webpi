const express = require('express');

const app = express();
const server = app.listen(3495);

app.use(express.static('public'));

console.log('winged guide server is running');

const socket = require('socket.io');
const io = socket(server);

let online = 0;

io.on('connect', socket => {
    console.log('new connection: ' + socket.id);
    console.log('online: ' + ++online);

    socket.on('disconnect', () => {
        socket.broadcast.emit('delUser', socket.id);
        console.log('disconnection: ' + socket.id);
        console.log('online: ' + --online);
    });
});