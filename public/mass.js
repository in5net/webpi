class Mass {
    constructor(x = random(edge.w), y = random(edge.h), col = color(random(255), random(255), random(255))) {
        this.pos = createVector(x, y);
        this.color = col;
        this.angle = 0;
        this.aVel = random(-PI / 60, PI / 60);
    }

    eatenBy(pl) {
        return dist(this.pos.x, this.pos.y, pl.pos.x, pl.pos.y) < 20;
    }

    update() {
        if (!player.inFOV(this.pos)) return;
        this.angle += this.aVel
    }

    display() {
        if (!player.inFOV(this.pos)) return;

        let c = this.color.levels;
        c[3] = 150;
        fill.apply(null, c);

        strokeWeight(2);
        c[3] = 200;
        stroke.apply(null, c);
        if (highDetail) {
            push();
            translate(this.pos.x + sin(this.angle) * 3, this.pos.y + cos(this.angle) * 3);
            rotate(this.angle);

            rectMode(CENTER);
            rect(0, 0, 10, 10, 3);

            pop();
            rectMode(CORNER);
        } else {
            ellipse(this.pos.x, this.pos.y, 10);
        }
    }
}