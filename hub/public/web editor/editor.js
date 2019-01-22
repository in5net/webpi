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

let playBtn = document.getElementById('play');
let stopBtn = document.getElementById('stop');
let saveBtn = document.getElementById('save');
let loadBtn = document.getElementById('load');
let passwordBox = document.getElementById('password');

let editor = document.getElementById('editor');
editor.value = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>My webpage</title>
</head>
<body>
    <h1>Welcome to my webpage!</h1>
</body>
</html>`;

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