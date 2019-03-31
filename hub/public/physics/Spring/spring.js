const NUM_PARTICLES = 4;
const ps = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    strokeWeight(2);

    for (let i = 0; i < NUM_PARTICLES; i++)
        ps.push(Particle.random());

    ps.forEach(p1 => ps.forEach(p2 => {
        if (p1 !== p2) p1.addSpring(p2);
    }));
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    background(255);
    ps.forEach(p => p.run());
}