const ip = '71.66.250.75';
const port = 3497;
// const ip = 'http://localhost';
// const port = 3000;

// Connection
let socket;

// Other players
const players = [];
// Returns all of the other players' ids
function ids() { return players.map(p => p.id); }
// Makes an object that can go in the players array
function createPlayer(id) {
    let p = new Powerline();
    p.id = id;
    return p;
}
// Current player
let player;

// Vars to control the environment
const accEdge = 0.03;
const accPlayer = 0.1;
const accMass = 0.1;
const friction = -0.02;
const frictionOutOfEdge = -0.06;
const respawnTime = 3;

// Directional unit vectors
let up, down, left, right;

// Floating mass and border
const masses = [];
let edge;
let newEdge;

// Colors
let backColor;
let colors;

// Vars to control the game
let showStartScreen = true;
let highDetail = true;
let debug = false;
let buttons;
let adminBtns;

// HTML elements
let name_input, code_input, length, game_title, leaderboard;

function setup() {
    createCanvas(windowWidth, windowHeight);
    socket = io.connect(ip + ':' + port);
    socket.on('delPlayer', delPlayer);
    socket.on('player', receive);
    socket.on('checkCode', checkCode);
    socket.on('admin', admin);

    setHTML();

    up = createVector(0, -1);
    down = createVector(0, 1);
    left = createVector(-1, 0);
    right = createVector(1, 0);

    edge = {
        w: 1500,
        h: 1500
    };
    newEdge = {
        w: edge.w,
        h: edge.h
    };

    backColor = color(19, 21, 31);
    colors = [
        color(26, 32, 54),
        color(17, 35, 49),
        color(10, 28, 48)
    ];

    player = new Powerline('', true);

    for (let i = 0; i < (edge.w + edge.h) / 25; i++) {
        masses.push(new Mass());
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    resetHTML();
}

function draw() {
    run();
}