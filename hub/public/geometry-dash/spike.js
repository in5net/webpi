class Spike {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}
	
	show() {
		let { x, y, w, h } = this;
		stroke(0);
		fill(255, 0, 0);
		rect(x, y, w, h);
	}
}