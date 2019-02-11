class Cell {
    constructor(i, j, w) {
        this.i = i;
        this.j = j;
        this.x = i * w;
        this.y = j * w;
        this.w = w;
        this.neighborCount = 0;

        this.bee = false;
        this.revealed = false;
    }

    contains(x, y) {
        return x > this.x && x < this.x + this.w &&
            y > this.y && y < this.y + this.w;
    }

    countBees() {
        if (this.bee) {
            this.neighborCount = -1;
            return;
        }

        let total = 0;

        for (let xoff = -1; xoff <= 1; xoff++) {
            for (let yoff = -1; yoff <= 1; yoff++) {
                let i = this.i + xoff;
                let j = this.j + yoff;
                if (i > -1 && i < cols & j > -1 && j < rows) {
                    let neighbor = grid[i][j];
                    if (neighbor.bee) total++;
                }
            }
        }
        this.neighborCount = total;
    }

    reveal() {
        this.revealed = true;
        if (this.neighborCount === 0) {
            this.floodFill();
        }
    }

    floodFill() {
        for (let xoff = -1; xoff <= 1; xoff++) {
            for (let yoff = -1; yoff <= 1; yoff++) {
                let i = this.i + xoff;
                let j = this.j + yoff;
                if (i > -1 && i < cols & j > -1 && j < rows) {
                    let neighbor = grid[i][j];
                    if (!neighbor.bee && !neighbor.revealed) neighbor.reveal();
                }
            }
        }
    }

    show() {
        stroke(0);
        strokeWeight(1);
        noFill();
        rect(this.x, this.y, this.w, this.w);
        if (this.revealed) {
            if (this.bee) {
                fill(127);
                ellipse(this.x + this.w / 2, this.y + this.w / 2, this.w / 2);
            } else {
                fill(200);
                rect(this.x, this.y, this.w, this.w);
                if (this.neighborCount > 0) {
                    strokeWeight(2);
                    textSize(2 * this.w / 3);
                    textAlign(CENTER, CENTER);
                    fill(0);
                    text(this.neighborCount, this.x + this.w / 2, this.y + this.w / 2);
                }
            }
        }
    }
}