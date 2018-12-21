const express = require('express');

const app = express();
const server = app.listen(3498);

app.use(express.static('public'));

console.log('chat server is running');

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


    socket.on('newUser', name => {
        socket.broadcast.emit('newUser', {
            id: socket.id,
            name: name
        });
    })

    socket.on('msg', data => {
        data.id = socket.id;
        socket.broadcast.emit('msg', data);
    });
});