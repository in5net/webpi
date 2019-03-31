class Rect {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w
        this.h = h || w;
        this.mass = (this.w + this.h) / 40;
        this.vel = createVector();
        this.acc = createVector();
    }

    applyForce(v) {
        this.acc.add(v.copy().div(this.mass));
    }

    gravity(v) {
        this.applyForce(v.copy().mult(this.mass));
    }

    centerX() {
        return this.x + this.w / 2;
    }

    centerY() {
        return this.y + this.h / 2;
    }

    collide(r) {
        let c = collide(this, r);
        if (c) {
            status = c;
            hits++;
        }
        if (c === 'left') {
            this.vel.x *= -friction;
            this.vel.y *= friction;
            this.x = r.x - this.w;
        } else if (c === 'right') {
            this.vel.x *= -friction;
            this.vel.y *= friction;
            this.x = r.x + r.w;
        } else if (c === 'top') {
            this.vel.x *= friction;
            this.vel.y *= -friction;
            this.y = r.y - this.h;
        } else if (c === 'bottom') {
            this.vel.x *= friction;
            this.vel.y *= -friction;
            this.y = r.y + r.h;
        }
        return c;
    }

    edges() {
        let x = createVector(-friction, friction);
        let y = createVector(friction, -friction);
        if (this.x < 0) {
            this.vel.x *= -friction;
            this.vel.y *= friction;
            this.x = 0;
            hits++;
        } else if (this.x + this.w > width) {
            this.vel.x *= -friction;
            this.vel.y *= friction;
            this.x = width - this.w;
            hits++;
        } else if (this.y < 0) {
            this.vel.x *= friction;
            this.vel.y *= -friction;
            this.y = 0;
            hits++;
        } else if (this.y + this.h > height) {
            this.vel.x *= friction;
            this.vel.y *= -friction;
            this.y = height - this.h;
            hits++;
        }
    }

    update() {
        this.vel.add(this.acc);
        this.x += this.vel.x;
        this.y += this.vel.y;
        this.acc.mult(0);
    }

    show() {
        let { x, y, w, h } = this;
        rect(x, y, w, h);
    }

    run() {
        this.edges();
        this.update();
        this.show();
    }
}

// A is the moving rect and the collision type will be expressed on B
function collide(A, B) {
    let collision = null;
    let w = (A.w + B.w) / 2;
    let h = (A.h + B.h) / 2;
    let dx = A.centerX() - B.centerX();
    let dy = A.centerY() - B.centerY();

    if (abs(dx) <= w && abs(dy) <= h) {
        let wy = w * dy;
        let hx = h * dx;

        if (wy > hx)
            if (wy > -hx) collision = 'bottom';
            else collision = 'left';
        else
        if (wy > -hx) collision = 'right';
        else collision = 'top';
    }
    return collision;
}

let mover;
let plats = [];
let status = 'none';
let hits = 0;
let airFriction = 0.999;
let friction = 0.9;
let grav;

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    mover = new Rect(0, 0, 20);
    mover.vel = p5.Vector.random2D().mult(10);

    for (let i = 0; i < width / 10; i++) {
        plats[i] = new Rect(random(width), random(height), random(15, 100), random(15, 100));
    }

    grav = createVector(0, 0.2);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
    let toMouse = p5.Vector.sub(createVector(mouseX, mouseY), createVector(mover.x, mover.y));
    mover.applyForce(toMouse.div(20));
}

function draw() {
    background(0);
    mover.applyForce(mover.vel.copy().mult((airFriction - 1) * mover.vel.mag()));
    mover.gravity(grav);

    fill(0, 255, 0);
    plats.forEach(p => {
        mover.collide(p);
        p.show();
    });
    fill(255);
    mover.run();

    text('Status: ' + status, 20, 20);
    text('Hits: ' + hits, 20, 40);
}