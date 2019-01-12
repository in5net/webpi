// // Code was apapted from Daniel Shiffman, Youtube: https://www.youtube.com/channel/UCvjgXvBlbQiydffZU7m1_aw
// let database;
// let drawing = [];
// let currentPath = [];
// let isDrawing = false;
// let name;

// function setup() {
//     createCanvas(200, 200)
//         .mousePressed(startPath)
//         .mouseReleased(endPath)
//         .parent('#canvas-container');

//     name = select('#name');
//     select('#save-button')
//         .mousePressed(saveDrawing);

//     select('#clear-button')
//         .mousePressed(clearDrawing);

//     // Initialize Firebase
//     var config = {
//         apiKey: "AIzaSyBckqC3VMTI5inUICnJJ50wIcn05ZyqNl4",
//         authDomain: "webpi-web-editor.firebaseapp.com",
//         databaseURL: "https://webpi-web-editor.firebaseio.com",
//         projectId: "webpi-web-editor",
//         storageBucket: "webpi-web-editor.appspot.com",
//         messagingSenderId: "448278739547"
//     };
//     firebase.initializeApp(config);
//     database = firebase.database();

//     let params = getURLParams();
//     if (params.id) {
//         showDrawing(params.id);
//     }

//     let ref = database.ref('drawings');
//     ref.on('value', gotData, errData);
// }

// function startPath() {
//     isDrawing = true;
//     currentPath = [];
//     drawing.push(currentPath);
// }

// function endPath() {
//     isDrawing = false;
// }

// function draw() {
//     background(0);

//     if (isDrawing) {
//         let point = {
//             x: mouseX,
//             y: mouseY
//         };
//         currentPath.push(point);
//     }

//     stroke(255);
//     strokeWeight(4);
//     noFill();
//     for (let path of drawing) {
//         beginShape();
//         for (let p of path) {
//             vertex(p.x, p.y);
//         }
//         endShape();
//     }
// }

// function saveDrawing() {
//     let ref = database.ref('drawings');
//     let data = {
//         name: name.value(),
//         drawing: drawing
//     };
//     let result = ref.push(data, dataSent);
//     console.log(result.key);

//     function dataSent(err, status) {
//         console.log(status);
//     }
// }

// function gotData(data) {
//     // clear the listing
//     let elts = selectAll('.listing');
//     for (let elt of elts) {
//         elt.remove();
//     }

//     let drawings = data.val();
//     let keys = Object.keys(drawings);
//     for (let key of keys) {
//         let li = createElement('li', '')
//             .class('listing')
//             .parent('#drawing-list');
//         let ahref = createA('#', drawings[key].name)
//             .id(key);
//         ahref.mousePressed(showDrawing.bind(ahref))
//             .parent(li);
//         createA('?id=' + key, 'permalink')
//             .style('padding', '4px')
//             .parent(li);
//     }
// }

// function errData(err) {
//     console.log(err);
// }

// function showDrawing(key) {
//     if (!key || key instanceof MouseEvent) {
//         key = this.id();
//     }

//     let ref = database.ref('drawings/' + key);
//     ref.once('value', oneDrawing, errData);

//     function oneDrawing(data) {
//         let dbdrawing = data.val();
//         drawing = dbdrawing.drawing;
//     }
// }

// function clearDrawing() {
//     drawing = [];
// }

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBckqC3VMTI5inUICnJJ50wIcn05ZyqNl4",
    authDomain: "webpi-web-editor.firebaseapp.com",
    databaseURL: "https://webpi-web-editor.firebaseio.com",
    projectId: "webpi-web-editor",
    storageBucket: "webpi-web-editor.appspot.com",
    messagingSenderId: "448278739547"
};
firebase.initializeApp(config);
const database = firebase.database();

// <p>Welcome to a webpage!</p>
let playBtn = document.getElementById('play');
let stopBtn = document.getElementById('stop');
let saveBtn = document.getElementById('save');
let loadBtn = document.getElementById('load');
let passwordBox = document.getElementById('password');

let editor = document.getElementById('editor');
let webpage = document.getElementById('webpage');

playBtn.onclick = function() {
    webpage.srcdoc = editor.value;
}

stopBtn.onclick = function() {
    webpage.srcdoc = '';
}

saveBtn.onclick = function() {
    let ref = database.ref(passwordBox.value);
    let data = editor.value;
    ref.set(data, (err, status) => {
        console.log(err, status);
    });
};

loadBtn.onclick = function() {
    let ref = database.ref(passwordBox.value);
    ref.once('value', data => {
        let code = data.val();
        editor.value = code;
    });
};