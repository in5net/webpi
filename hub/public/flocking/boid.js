class Boid {
    constructor(boids) {
        this.boids = boids;

        this.pos = createVector(random(width), random(height));
        this.vel = p5.Vector.random2D().setMag(random(1, 5));
        this.acc = createVector();

        this.maxSpeed = 5;
        this.maxForce = 0.12;
        this.viewRadius = 100;
    }

    edges() {
        if (this.pos.x < -20) this.pos.x = width;
        else if (this.pos.x > width + 20) this.pos.x = 0;
        if (this.pos.y < -20) this.pos.y = height;
        else if (this.pos.y > height + 20) this.pos.y = 0;
    }

    alignment() {
        let avarage = createVector();
        let total = 0;

        for (let b of this.boids) {
            if (b !== this && this.pos.dist(b.pos) < this.viewRadius) {
                avarage.add(b.vel.copy());
                total++;
            }
        }

        if (total > 0) {
            avarage.div(total);
            avarage.setMag(this.maxSpeed);
            avarage.sub(this.vel);
            avarage.limit(this.maxForce);
        }

        return avarage;
    }

    cohesion() {
        let avarage = createVector();
        let total = 0;

        for (let b of this.boids) {
            if (b !== this && this.pos.dist(b.pos) < this.viewRadius) {
                avarage.add(b.pos.copy());
                total++;
            }
        }

        if (total > 0) {
            avarage.div(total);
            avarage.sub(this.pos);
            avarage.setMag(this.maxSpeed);
            avarage.sub(this.vel);
            avarage.limit(this.maxForce);
        }

        return avarage;
    }

    separation() {
        let avarage = createVector();
        let total = 0;

        for (let b of this.boids) {
            let d = this.pos.dist(b.pos);
            if (b !== this && d < this.viewRadius) {
                let diff = p5.Vector.sub(this.pos, b.pos);
                diff.div(d);
                avarage.add(diff);
                total++;
            }
        }

        if (total > 0) {
            avarage.div(total);
            avarage.setMag(this.maxSpeed);
            avarage.sub(this.vel);
            avarage.limit(this.maxForce);
        }

        return avarage;
    }

    update() {
        let alignment = this.alignment().mult(alignmentSlider.value());
        let cohesion = this.cohesion().mult(cohesionSlider.value());
        let separation = this.separation().mult(separationSlider.value());

        this.acc.add(alignment);
        this.acc.add(cohesion);
        this.acc.add(separation);

        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);

        this.pos.add(this.vel);

        this.edges();

        this.acc.mult(0);
    }

    show() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading() + PI / 2);

        noStroke();
        fill(255);
        triangle(0, 0, -5, 15, 5, 15);

        pop();
    }
}