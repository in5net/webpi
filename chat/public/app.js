const ip = 'nolimits.ga';
const port = 3498;
const users = [];

const socket = io.connect(ip + ':' + port);
socket.on('newUser', newUser);
socket.on('delUser', delUser);
socket.on('msg', receive);

let name = prompt('Name:') || 'unnamed';
socket.emit('newUser', name);

let usernames = document.getElementById('usernames');
let typeArea = document.getElementsByName('type-area')[0];
let submit = document.getElementsByTagName('button')[0];
let chat = document.getElementById('chat');

updateOnline();

function msg(name, text) {
    chat.innerHTML += `${name}: ${text}<br>`;
}

function updateOnline() {
    let names = '';
    users.forEach(user => {
        names += ', ' + user.name;
    });
    usernames.textContent = `Online: ${name}(you)${names}`;
}

submit.onclick = function() {
    msg(name + '(you)', typeArea.value);
    socket.emit('msg', {
        name: name,
        msg: typeArea.value
    });
    typeArea.value = '';
};

function newUser(user) {
    users.push(user);
    updateOnline();
    msg('<strong>server</strong>', user.name + ' connected');
}

function delUser(id) {
    let idx = users.findIndex(user => user.id === id);
    users.splice(idx, 1);
    updateOnline();
    msg('<strong>server</strong>', users[idx].name + ' disconnected');
}

function receive(data) {
    msg(data.name, data.msg);
    let newU = false;
    for (let user of users) {
        if (user.id === data.id) {
            newU = true;
            break;
        }
    }

    if (!newU) {
        users.push(data);
        updateOnline();
    }
}