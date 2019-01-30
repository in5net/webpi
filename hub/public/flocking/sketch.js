const flock = [];

let alignmentSlider, cohesionSlider, separationSlider;

function setup() {
    alignmentSlider = createSlider(0, 3, 1, 0.1);
    cohesionSlider = createSlider(0, 3, 1, 0.1);
    separationSlider = createSlider(0, 3, 1, 0.1);

    select('#alignment')
        .child(alignmentSlider)
        .child(createP('Alignment'));
    select('#cohesion')
        .child(cohesionSlider)
        .child(createP('Cohesion'));
    select('#separation')
        .child(separationSlider)
        .child(createP('Separation'));

    let grid = select('#grid')
        .child(alignment)
        .child(cohesion)
        .child(separation);

    createCanvas(windowWidth, windowHeight - grid.size().height);

    for (let i = 0; i < 200; i++) {
        flock.push(new Boid(flock));
    }
}

function draw() {
    background(0);

    for (let boid of flock) {
        boid.update();
        boid.show();
    }
}