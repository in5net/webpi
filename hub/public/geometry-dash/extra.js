function linesIntersect(a, b, c, d, p, q, r, s) {
	let det = (c - a) * (s - q) - (r - p) * (d - b);
	if (det === 0) {
		return false;
	} else {
		let lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
		let gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
		return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
	}
}