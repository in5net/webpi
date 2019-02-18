class Player {
	constructor(x, y, w, h) {
		this.pos = createVector(x, y);
		this.vel = createVector(5, 0);
		this.acc = createVector(0, 0);
		
		this.w = w;
		this.h = h;
	}
	
	copy() {
		let p = new Player();
		
		p.pos = this.pos.copy();
		p.vel = this.vel.copy();
		p.acc = this.acc.copy();
		
		p.w = this.w;
		p.h = this.h;
		
		return p;
	}
	
	intersect(p) {
		let { x, y, w, h } = p;
		
		let intersecting = !(this.pos.x + this.w < x || this.pos.x > x + w) &&
				!(this.pos.y + this.h < y || this.pos.y > y + h);
		if (intersecting) {
			if (p instanceof Platform) {
				// up
				if (this.pos.y + this.h < y + h/2) {
					this.pos.y = y - this.h;
					this.vel.y = 0;
				}
				// down
				else if (this.pos.y > y + h/2) {
					this.pos.y = y + h;
					this.vel.y = 0;
				}
				// // left
				// if (this.pos.x + this.w < x + w/2) {
				// 	this.pos.x = x - this.w;
				// 	this.vel.x = 0;
				// }
				// // right
				// else if (this.pos.x > x + w/2) {
				// 	this.pos.x = x + w;
				// 	this.vel.x = 0;
				// }
			} else if (p instanceof Spike) {
				this.die();
			}
		}
		
		return intersecting;
	}
	
	applyForce(v) {
		this.acc.add(v);
	}
	
	keys() {
		if (keyIsPressed) {
			if (keyIsDown(LEFT_ARROW))
				this.applyForce(createVector(-0.1, 0));
			if (keyIsDown(RIGHT_ARROW))
				this.applyForce(createVector(0.1, 0));
		}
	}
	
	die() {
		tries.push(round(this.pos.x));
		this.pos = createVector(0, 150);
		plats = [];
		i = 0;
		noiseSeed(random(width*height));
	}
	
	update(plats) {
		//this.keys();
		this.applyForce(gravity);
		
		let intersecting = [];
		plats.forEach(p => {
			intersecting.push(this.intersect(p, true));
		});
		
		this.vel.y += this.acc.y;
		this.pos.add(this.vel);
		this.acc.mult(0);
		// this.vel.add(this.acc);
		// this.vel.limit(5);
		// this.pos.add(this.vel);
		// this.acc.mult(0);
		
		return intersecting.some(b => b);
	}
	
	show() {
		let { w, h } = this;
		let { x, y } = this.pos;
		
		noStroke()
		fill(255, 0, 255);
		rect(x, y, w, h);
	}
	
	run(plats) {
		this.update(plats);
		this.show();
	}
}