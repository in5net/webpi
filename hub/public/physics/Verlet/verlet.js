let points,
    sticks,
    forms,
    bounce = 0.7,
    gravity = 0.5,
    friction = 0.99,
    iterations = 5;

function setup() {
    createCanvas(windowWidth, windowHeight);
    strokeWeight(2);

    points = [{
            pos: vec(100, 100)
        },
        {
            pos: vec(150, 100)
        },
        {
            pos: vec(150, 150)
        },
        {
            pos: vec(100, 150)
        },
        {
            pos: vec(300, 100),
            pinned: true
        },
        {
            pos: vec(200, 100)
        },
    ];
    points.forEach(p => {
        if (!p.oldpos)
            p.oldpos = p.pos.copy();
    });
    sticks = [{
            p1: 0,
            p2: 1
        },
        {
            p1: 1,
            p2: 2
        },
        {
            p1: 2,
            p2: 3
        },
        {
            p1: 3,
            p2: 0
        },
        {
            p1: 0,
            p2: 2,
            hidden: true
        },
        {
            p1: 1,
            p2: 3,
            hidden: true
        },
        {
            p1: 4,
            p2: 5,
        },
        {
            p1: 5,
            p2: 0,
        }
    ];
    sticks.forEach(s => {
        if (!s.length)
            s.length = utils.pointDist(points[s.p1].pos, points[s.p2].pos);
    });
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    background(255);
    updatePoints();
    for (let i = 0; i < iterations; i++) {
        constrainPoints();
        updateSticks();
    }
    // renderPoints();
    renderSticks();
    // renderForms();
}

function updatePoints() {
    points.forEach(p => {
        if (!p.pinned) {
            let vel = Vector.sub(p.pos, p.oldpos)
                .mult(friction);

            p.oldpos = p.pos.copy();

            p.pos.add(vel);
            p.pos.y += gravity;
        } else
            p.pos = vec(mouseX, mouseY);
    });
}

function constrainPoints() {
    points.forEach(p => {
        if (!p.pinned) {
            let vel = Vector.sub(p.pos, p.oldpos)
                .mult(friction);

            if (p.pos.x < 0) {
                p.pos.x = 0;
                p.oldpos.x = p.pos.x + vel.x * bounce;
            } else if (p.pos.x > width) {
                p.pos.x = width;
                p.oldpos.x = p.pos.x + vel.x * bounce;
            }
            if (p.pos.y < 0) {
                p.pos.y = 0;
                p.oldpos.y = p.pos.y + vel.y * bounce;
            } else if (p.pos.y > height) {
                p.pos.y = height;
                p.oldpos.y = p.pos.y + vel.y * bounce;
            }
        }
    });
}

function updateSticks() {
    sticks.forEach(s => {
        let dx = points[s.p2].pos.x - points[s.p1].pos.x,
            dy = points[s.p2].pos.y - points[s.p1].pos.y,
            distance = Math.sqrt(dx * dx + dy * dy),
            difference = s.length - distance,
            percent = difference / distance / 2,
            offset = vec(dx * percent, dy * percent);

        if (!points[s.p1].pinned) points[s.p1].pos.sub(offset);
        if (!points[s.p2].pinned) points[s.p2].pos.add(offset);
    });
}

function renderPoints() {
    points.forEach(p => {
        ellipse(p.pos.x, p.pos.y, 10);
    });
}

function renderSticks() {
    sticks.forEach(s => {
        if (!s.hidden)
            line(points[s.p1].pos.x, points[s.p1].pos.y, points[s.p2].pos.x, points[s.p2].pos.y);
    });
}

function renderForms() {
    forms.forEach(f => {
        beginShape();
        fill(f.color);
        f.path.forEach(p => vertex(p.pos.x, p.pos.y));
        endShape(CLOSE);
    });
}