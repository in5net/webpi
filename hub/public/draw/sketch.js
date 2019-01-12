// Code was apapted from Daniel Shiffman, Youtube: https://www.youtube.com/channel/UCvjgXvBlbQiydffZU7m1_aw
let database;
let drawing = [];
let currentPath = [];
let isDrawing = false;
let name;

function setup() {
    createCanvas(200, 200)
        .mousePressed(startPath)
        .mouseReleased(endPath)
        .parent('#canvas-container');

    name = select('#name');
    select('#save-button')
        .mousePressed(saveDrawing);

    select('#clear-button')
        .mousePressed(clearDrawing);

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyB2tN-kzZFvLHDhC8G7TOlI-WhndUaZGHk",
        authDomain: "saving-p5js-drawings.firebaseapp.com",
        databaseURL: "https://saving-p5js-drawings.firebaseio.com",
        projectId: "saving-p5js-drawings",
        storageBucket: "saving-p5js-drawings.appspot.com",
        messagingSenderId: "727480465717"
    };
    firebase.initializeApp(config);
    database = firebase.database();

    let params = getURLParams();
    if (params.id) {
        showDrawing(params.id);
    }

    let ref = database.ref('drawings');
    ref.on('value', gotData, errData);
}

function startPath() {
    isDrawing = true;
    currentPath = [];
    drawing.push(currentPath);
}

function endPath() {
    isDrawing = false;
}

function draw() {
    background(0);

    if (isDrawing) {
        let point = {
            x: mouseX,
            y: mouseY
        };
        currentPath.push(point);
    }

    stroke(255);
    strokeWeight(4);
    noFill();
    for (let path of drawing) {
        beginShape();
        for (let p of path) {
            vertex(p.x, p.y);
        }
        endShape();
    }
}

function saveDrawing() {
    let ref = database.ref('drawings');
    let data = {
        name: name.value(),
        drawing: drawing
    };
    let result = ref.push(data, dataSent);
    console.log(result.key);

    function dataSent(err, status) {
        console.log(status);
    }
}

function gotData(data) {
    // clear the listing
    let elts = selectAll('.listing');
    for (let elt of elts) {
        elt.remove();
    }

    let drawings = data.val();
    let keys = Object.keys(drawings);
    for (let key of keys) {
        let li = createElement('li', '')
            .class('listing')
            .parent('#drawing-list');
        let ahref = createA('#', drawings[key].name)
            .id(key);
        ahref.mousePressed(showDrawing.bind(ahref))
            .parent(li);
        createA('?id=' + key, 'permalink')
            .style('padding', '4px')
            .parent(li);
    }
}

function errData(err) {
    console.log(err);
}

function showDrawing(key) {
    if (!key || key instanceof MouseEvent) {
        key = this.id();
    }

    let ref = database.ref('drawings/' + key);
    ref.once('value', oneDrawing, errData);

    function oneDrawing(data) {
        let dbdrawing = data.val();
        drawing = dbdrawing.drawing;
    }
}

function clearDrawing() {
    drawing = [];
}