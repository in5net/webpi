class Particle {
    constructor(x, y, speed = 0, dir = 0) {
        this.pos = vec(x, y);
        this.vel = vec().length(speed).angle(dir);
        this.acc = vec();

        this.mass = 1;
        this.radius = 10;
        this.bounce = 0.7;
        this.friction = 0.95;

        this.gravitations = [];
        this.gravity = vec(0, 0.5);

        this.springs = [];
        this.springForce = 0.04;
        this.springLength = 80;
    }

    update() {
        if (mouseIsPressed && utils.circlePointCollision(pmouseX, pmouseY, this)) {
            this.pos = vec(mouseX, mouseY);
            return;
        }

        this.handleSprings();
        this.handleGravitations();
        this.force(Vector.mult(this.gravity, this.mass));

        this.vel.add(this.acc);
        this.vel.mult(this.friction);

        this.pos.add(this.vel);
        this.edges();

        this.acc.mult(0);
    }

    force(v) {
        this.acc.add(Vector.div(v, this.mass));
    }

    angleTo(p) {
        return Math.atan2(p.y - this.y, p.x - this.x);
    }

    dist(p) {
        let dx = p.x - this.x,
            dy = p.y - this.y;

        return Math.sqrt(dx * dx + dy * dy);
    }

    addGravitation(p) {
        this.removeSpring(p);
        this.gravitations.push(p);
    }

    removeGravitation(p) {
        for (let i = 0; i < this.gravitations.length; i++) {
            if (p === this.gravitations[i]) {
                this.gravitations.splice(i, 1);
                return;
            }
        }
    }

    handleGravitations() {
        this.gravitations.forEach(p => this.gravitateTo(p));
    }

    gravitateTo(p) {
        let dist = this.dist(p);

        let grav = vec()
            .length(p.mass / (dist * dist))
            .angle(this.angleTo(p));

        this.force(grav);
    }

    addSpring(p) {
        this.removeSpring(p);
        this.springs.push(p);
    }

    removeSpring(p) {
        for (let i = 0; i < this.springs.length; i++) {
            if (p === this.springs[i]) {
                this.springs.splice(i, 1);
                return;
            }
        }
    }

    handleSprings() {
        this.springs.forEach(p => this.springTo(p));
    }

    springTo(p) {
        let distance = Vector.sub(p.pos, this.pos);
        distance.length(distance.length() - p.springLength);
        let springForce = Vector.mult(distance, p.springForce);
        this.force(springForce);
    }

    edges() {
        if (this.x - this.radius <= 0) {
            this.x = this.radius;
            this.vx *= -this.bounce;
        } else if (this.x + this.radius >= width) {
            this.x = width - this.radius;
            this.vx *= -this.bounce;
        }

        if (this.y - this.radius <= 0) {
            this.y = this.radius;
            this.vy *= -this.bounce;
        } else if (this.y + this.radius >= height) {
            this.y = height - this.radius;
            this.vy *= -this.bounce;
        }
    }

    draw() {
        this.springs.forEach(p => line(p.x, p.y, this.x, this.y));
        ellipse(this.x, this.y, this.radius * 2);
    }

    run() {
        this.update();
        this.draw();
    }

    static random() {
        return new Particle(utils.random(width), utils.random(height));
    }

    get x() {
        return this.pos.x;
    }

    set x(n) {
        this.pos.x = n;
    }

    get y() {
        return this.pos.y;
    }

    set y(n) {
        this.pos.y = n;
    }

    get vx() {
        return this.vel.x;
    }

    set vx(n) {
        this.vel.x = n;
    }

    get vy() {
        return this.vel.y;
    }

    set vy(n) {
        this.vel.y = n;
    }

    get ax() {
        return this.acc.x;
    }

    set ax(n) {
        this.acc.x = n;
    }

    get ay() {
        return this.acc.y;
    }

    set ay(n) {
        this.acc.y = n;
    }
}