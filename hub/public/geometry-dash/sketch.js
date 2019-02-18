let gravity = { x: 0, y: 0.2 };
let p;
let plats = [];
let tries = [];

let i = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);

    gravity = createVector(gravity.x, gravity.y);

    p = new Player(0, 150, 20, 20);
}

function keyPressed() {
    if (keyIsDown(UP_ARROW)) p.applyForce(createVector(0, -6));
}

function draw() {
    background(255);
    push();
    translate(width / 2 - p.pos.x, height / 2 - p.pos.y);

    plats.forEach(plat => {
        if (plat.x < p.pos.x - width) {
            plats.splice(plats.indexOf(plat), 1);
        }
    });

    if (plats[plats.length - 1].x < p.pos.x + width) {
        plats.push(new Platform(i, 200 + 40 * noise(i / 500), 100, 60));
        if (random() < 0.15) {
            plats.push(new Spike(i + 40 + random(20), 180 + 40 * noise(i / 500), 20, 20));
        }
        i += 100;
    }

    plats.forEach(plat => plat.show());

    p.run(plats);

    stroke(0, 255, 255);
    fill(0, 0, 255);
    tries.forEach(t => {
        line(t, -height, t, 2 * height);
        text(t, t + 5, 100);
    });

    pop();

    fill(0, 0, 255);
    textSize(30);
    text('Geometry Dash 2', 150, 45);

    let j = 0;
    fill(0);
    textSize(14);
    text("Distance: " + round(p.pos.x / 20), 5, 25 + 15 * j++);
    text("Platforms: " + plats.length, 5, 25 + 15 * j++);
    text("Tries: " + tries.length, 5, 25 + 15 * j++);

    noStroke();
    let mapped = map(p.pos.x, 0, max(tries), 0, width);
    fill(0, 0, 255, map(mapped, 0, width, 100, 255));
    rect(0, 0, mapped, 10);
}