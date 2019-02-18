class Platform {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}
	
	show() {
		let { x, y, w, h } = this;
		stroke(100);
		fill(0);
		rect(x, y, w, h);
	}
}