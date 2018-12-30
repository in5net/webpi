const express = require('express');

const app = express();
const server = app.listen(3499);

app.use(express.static('public'));

console.log('hub server is running');

const socket = require('socket.io');
const io = socket(server);

let online = 0;

io.on('connect', socket => {
    console.log('new connection: ' + socket.id);
    console.log('online: ' + ++online);

    socket.on('disconnect', () => {
        console.log('disconnection: ' + socket.id);
        console.log('online: ' + --online);
    });
});