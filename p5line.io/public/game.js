function admin(command, val) {
    switch (command) {
        case 'map':
            newEdge.w = val;
            newEdge.h = val;
    }
}

function checkCode(bools) {
    player.isAdmin = bools.isAdmin;
    player.isCreator = bools.isCreator;
}

function vec(x, y) {
    return { x: x, y: y };
}

function send() {
    let p = {};

    for (let prop in player) {
        if (player.hasOwnProperty(prop)) {
            p[prop] = player[prop];
        }
    }

    let dir = player.dir;
    p.dir = vec(dir.x, dir.y);

    p.nodes = player.nodes.map(node => vec(node.x, node.y));

    let turnPoints = [];
    player.turnPoints.forEach(tp => {
        turnPoints.push(vec(tp.x, tp.y));
    });
    p.turnPoints = turnPoints;

    let c = player.color.levels;
    p.color = { r: c[0], g: c[1], b: c[2] };

    socket.emit('player', p);
}

function receive(data) {
    let newPlayer = ids().every(id => data.id !== id);
    if (newPlayer) {
        let p = createPlayer(data.id);
        players.push(p);
    }

    let idx = ids().indexOf(data.id);

    for (let prop in data) {
        if (data.hasOwnProperty(prop)) {
            players[idx][prop] = data[prop];
        }
    }

    players[idx].dir = createVector(data.dir.x, data.dir.y);
    players[idx].nodes = data.nodes.map(node => createVector(node.x, node.y));
    players[idx].turnPoints = data.turnPoints.map(tp => createVector(tp.x, tp.y));

    let c = data.color;
    players[idx].color = color(c.r, c.g, c.b);
}

function delPlayer(id) {
    let idx = ids().findIndex(plid => id === plid);
    players.splice(idx, 1);
}

function run() {
    background(backColor);

    if (showStartScreen) {
        noStroke();
        let i = 0;
        let j = 0;
        for (let x = -25; x < width + 25; x += 60) {
            for (let y = -25; y < height + 25; y += 60) {
                fill(colors[j++ % 3]);
                ellipse(x, y, 50);
            }
            i++;
            j = i;
        }

        length.html('Length: ' + player.length);
    } else {
        push();
        translate(width / 2 - player.pos.x, height / 2 - player.pos.y);

        if (highDetail) {
            noStroke();
            let pos = p5.Vector.sub(player.pos, createVector(width / 2, height / 2));
            let i = 0;
            let j = 0;
            for (let x = 30; x <= edge.w - 30; x += 60) {
                for (let y = 30; y <= edge.h - 30; y += 60) {
                    if (player.inFOV({ x: x, y: y })) {
                        fill(colors[j++ % 3]);
                        ellipse(x, y, 50);
                    }
                }
                i++;
                j = i;
            }
        }

        gameScene();
        player.update();
        player.display();
        players.forEach(p => p.display());

        pop();
    }

    edge.w = lerp(edge.w, newEdge.w, 0.05);
    edge.h = lerp(edge.h, newEdge.h, 0.05);

    showHTML();
    send();
}