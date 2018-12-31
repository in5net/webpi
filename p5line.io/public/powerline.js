class Powerline {
    constructor(name = 'player' + round(random(1000)), isPlayer = false, x = random(edge.w), y = random(edge.h), length = 10) {
        this.name = name;

        this.isPlayer = isPlayer;
        this.sinceDead = 0;
        this.turnFrame = 0;
        this.startLength = length;

        this.reset(x, y);
    }

    get length() {
        return this.nodes.length;
    }

    get pos() {
        return this.nodes[0];
    }

    get end() {
        return this.nodes[-1];
    }

    get points() {
        let points = [this.end];
        points.push.apply(points, this.turnPoints);
        points.push(this.pos);
        return points;
    }

    inFOV(point) {
        return point.x > this.pos.x - (width / 2 + 15) &&
            point.x < this.pos.x + (width / 2 + 15) &&
            point.y > this.pos.y - (height / 2 + 15) &&
            point.y < this.pos.y + (height / 2 + 15);
    }

    reset(x = random(edge.w), y = random(edge.h)) {
        this.alive = true;
        this.nodes = [];
        this.turnPoints = [];

        this.vel = 2;
        this.acc = 0;
        this.dir = up;
        this.dirString = '';

        this.color = color(random(255), random(255), random(255));
        while (this.color.levels.sum() < 300) {
            this.color = color(random(255), random(255), random(255));
        }

        for (let i = 0; i < this.startLength; i++) {
            this.nodes.push(createVector(x, y + i * 5));
        }
    }

    addLength(amt) {
        let last = this.nodes[-1].copy();
        for (let i = 0; i < amt; i++) {
            this.nodes.push(last);
        }
    }

    outOfBounds() {
        return this.pos.x > edge.w ||
            this.pos.x < 0 ||
            this.pos.y > edge.h ||
            this.pos.y < 0;
    }

    turn() {
        if (this.isPlayer) {
            if (keyIsPressed) {
                if (this.isAdmin) {
                    if (keyIsDown(UP_ARROW)) {
                        if (this.dir !== up && this.dir !== down) {
                            this.dir = up;
                            this.turnPoints.push(this.pos.copy());
                            this.dirString += 'up';
                        }
                    } else if (keyIsDown(DOWN_ARROW)) {
                        if (this.dir !== down && this.dir !== up) {
                            this.dir = down;
                            this.turnPoints.push(this.pos.copy());
                            this.dirString += 'down';
                        }
                    }

                    if (keyIsDown(LEFT_ARROW)) {
                        if (this.dir !== left && this.dir !== right) {
                            this.dir = left;
                            this.turnPoints.push(this.pos.copy());
                            this.dirString += ' left';
                        }
                    } else if (keyIsDown(RIGHT_ARROW)) {
                        if (this.dir !== right && this.dir !== left) {
                            this.dir = right;
                            this.turnPoints.push(this.pos.copy());
                            this.dirString += ' right';
                        }
                    }

                    print(this.dirString);

                    switch (this.dirString) {
                        case 'up left':
                            if (this.dirString !== 'down right') {
                                this.dir = up.copy();
                                this.dir.rotate(-PI / 4);
                                this.turnPoints.push(this.pos.copy());
                            }
                            break;
                        case 'up right':
                            if (this.dirString !== 'down left') {
                                this.dir = up.copy();
                                this.dir.rotate(PI / 4);
                                this.turnPoints.push(this.pos.copy());
                            }
                            break;
                        case 'down left':
                            if (this.dirString !== 'up right') {
                                this.dir = down.copy();
                                this.dir.rotate(PI / 4);
                                this.turnPoints.push(this.pos.copy());
                            }
                            break;
                        case 'down right':
                            if (this.dirString !== 'up left') {
                                this.dir = down.copy();
                                this.dir.rotate(-PI / 4);
                                this.turnPoints.push(this.pos.copy());
                            }
                    }

                    this.dirString = '';
                } else {
                    switch (keyCode) {
                        case UP_ARROW:
                            if (this.dir !== up && this.dir !== down) {
                                this.dir = up;
                                this.turnPoints.push(this.pos.copy());
                            }
                            break;
                        case DOWN_ARROW:
                            if (this.dir !== down && this.dir !== up) {
                                this.dir = down;
                                this.turnPoints.push(this.pos.copy());
                            }
                            break;
                        case LEFT_ARROW:
                            if (this.dir !== left && this.dir !== right) {
                                this.dir = left;
                                this.turnPoints.push(this.pos.copy());
                            }
                            break;
                        case RIGHT_ARROW:
                            if (this.dir !== right && this.dir !== left) {
                                this.dir = right;
                                this.turnPoints.push(this.pos.copy());
                            }
                    }
                }
            }
        } else {
            let ran = floor(random(4));
            if (this.turnFrame > 40) {
                let prev_dir = this.dir;
                switch (ran) {
                    case 0:
                        this.dir = up;
                        break;
                    case 1:
                        this.dir = down;
                        break;
                    case 2:
                        this.dir = left;
                        break;
                    case 3:
                        this.dir = right;
                }

                if (this.dir !== prev_dir) {
                    this.turnPoints.push(this.pos.copy());
                }
                this.turnFrame = 0;
            }
            this.turnFrame++;
        }
    }

    die() {
        this.vel = 0;
        this.alive = false;

        if (this.isAdmin) {
            colorMode(HSB, 360, 255, 255);

            let h = 0;
            for (let i = 0; i < this.length; i += 7) {
                let node = this.nodes[i];
                masses.push(new Mass(node.x + random(-7, 7), node.y + random(-7, 7), color(h, 255, 255)));

                h += 7;
                if (h > 360) h = 0;
            }

            colorMode(RGB);
        } else {
            for (let i = 0; i < this.length; i += 7) {
                let node = this.nodes[i];
                masses.push(new Mass(node.x + random(-7, 7), node.y + random(-7, 7), this.color));
            }
        }
    }

    crash() {
        if (this.alive) {
            let cpt = this.pos;
            let ncpt = this.nodes[1];
            for (let p of players) {
                if (p.alive) {
                    let pts = p.points;
                    for (let i = 0; i < pts.length - 1; i++) {
                        let pt = pts[i];
                        let npt = pts[i + 1];
                        if (linesIntersect(cpt.x, cpt.y, ncpt.x, ncpt.y, pt.x, pt.y, npt.x, npt.y)) {
                            this.die();
                            return;
                        }
                    }
                }
            }

            let pts = this.points;
            for (let i = 0; i < pts.length - 2; i++) {
                let pt = pts[i];
                let npt = pts[i + 1];
                if (linesIntersect(cpt.x, cpt.y, ncpt.x, ncpt.y, pt.x, pt.y, npt.x, npt.y)) {
                    this.die();
                    return;
                }
            }
        }
    }

    speed() {
        if (this.pos.x > edge.w - 50 ||
            this.pos.y > edge.h - 50 ||
            this.pos.x < 50 ||
            this.pos.y < 50) {
            this.applyForce(accEdge);
        } else {
            if (this.alive) {
                for (let p of players) {
                    if (p.alive) {
                        let pts = p.points;
                        for (let i = 0; i < pts.length - 1; i++) {
                            let pt = pts[i];
                            let npt = pts[i + 1] || pl.pos;
                            if (this.pos.dist(pt) + this.pos.dist(npt) < pt.dist(npt) + 30) {
                                this.applyForce(accPlayer);
                                break;
                            }
                        }
                    }
                }
            }
        }
        this.applyForce(friction);
    }

    applyForce(f) {
        this.acc += f;
    }

    time() {
        if (!this.alive) {
            this.sinceDead++;
            if (this.sinceDead > 60 * respawnTime) {
                if (this.isPlayer) {
                    showStartScreen = true;
                } else {
                    this.reset();
                }
                this.sinceDead = 0;
            }
        }
    }

    vectors() {
        if (this.outOfBounds()) {
            this.applyForce(frictionOutOfEdge);
        }

        this.vel += this.acc;
        if (this.vel <= 0) {
            this.die();
            return;
        }

        if (this.outOfBounds()) {
            this.vel = constrain(this.vel, 0, 8);
        } else {
            this.vel = constrain(this.vel, 2, 8);
        }

        if (this.turnPoints[0] &&
            this.turnPoints[0].x === this.nodes[-1].x &&
            this.turnPoints[0].y === this.nodes[-1].y) {
            this.turnPoints.splice(0, 1);
        }

        let last = this.nodes.pop();
        last = this.pos.copy();
        last.add(p5.Vector.mult(this.dir, this.vel));
        this.nodes.unshift(last);

        this.acc = 0;
    }

    update() {
        this.time();

        if (this.alive) {
            this.crash();
            this.speed();
            this.turn();
            this.vectors();
        }
    }

    display() {
        let inPlayerFOV = this.points.some(pt => this === player || player.inFOV(pt));

        if ((!inPlayerFOV && !this.isPlayer) || !this.alive) return;

        let a = map(this.sinceDead, 0, 15, 255, 0);

        if (this.isAdmin) {
            noFill();
            strokeWeight(8);
            colorMode(HSB, 360, 255, 255);

            let h = 0;

            for (let i = 0; i < this.nodes.length - 1; i++) {
                let pt = this.nodes[i];
                let npt = this.nodes[i + 1];

                stroke(h, 255, 255, a);
                line(pt.x, pt.y, npt.x, npt.y);

                h++;
                if (h > 360) h = 0;
            }

            colorMode(RGB);
        } else {
            noFill();

            let c = this.color.levels;
            c[3] = a;
            stroke.apply(null, c);

            strokeWeight(8);
            beginShape();
            for (let p of this.points) {
                vertex(p.x, p.y);
            }
            endShape();
        }

        if (debug) {
            stroke(0, 0, 255, a);
            strokeWeight(5);

            for (let p of this.points) {
                point(p.x, p.y);
            }

            push();
            translate(this.pos.x, this.pos.y);

            stroke(0);
            line(0, 0, this.dir.x * 20, this.dir.y * 20);

            pop();
        }

        fill(255, a);
        noStroke();
        textAlign(CENTER);
        textSize(15);

        text(this.name, this.pos.x, this.pos.y + 20);
    }
}