class Button {
    constructor(text, x, y, w, h, r) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.r = r;
    }

    draw() {
        noStroke();
        fill(180, 93, 252);
        rect(this.x, this.y, this.w, this.h, this.r);

        fill(0);
        textSize(this.h - 2);
        textAlign(CENTER, CENTER);
        text(this.text, this.x + this.w / 2, this.y + this.h / 2);
    }

    clicked() {
        return mouseIsPressed && mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h;
    }
}

// Adapted from Daniel Shiffman
function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

let grid;
let draw_grid;
let old_draw_grid;
let cols;
let rows;
let resolution = 5;
let bframe = 0;

let start = false;
let buttonReady = true;
let drawing = true;

let startBtn = new Button("Start", resolution, resolution, resolution * 10, resolution * 4);
let randomizeBtn = new Button("Random", resolution + startBtn.x + startBtn.w, resolution, resolution * 16, resolution * 4);
let clearBtn = new Button("Clear", resolution + randomizeBtn.x + randomizeBtn.w, resolution, resolution * 10, resolution * 4);
let drawEraseBtn = new Button("Draw", resolution + clearBtn.x + clearBtn.w, resolution, resolution * 12, resolution * 4);
let undoBtn = new Button("Undo", resolution + drawEraseBtn.x + drawEraseBtn.w, resolution, resolution * 10, resolution * 4);

let pauseBtn = new Button("Pause", resolution, resolution, resolution * 12, resolution * 4);

function setup() {
    let len = windowHeight;
    createCanvas(len, len);
    cols = ceil(width / resolution);
    rows = ceil(height / resolution);
    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = 0;
        }
    }
    draw_grid = grid;
    old_draw_grid = draw_grid;
}

function mousePressed() {
    let x = round(mouseX / resolution);
    let y = round(mouseY / resolution);
    if (grid[x]) grid[x][y] = drawing ? 1 : 0;
}

function mouseDragged() {
    let x = round(mouseX / resolution);
    let y = round(mouseY / resolution);
    if (grid[x]) grid[x][y] = drawing ? 1 : 0;
}

function mouseReleased() {
    if (!start) {
        old_draw_grid = draw_grid;
        draw_grid = grid;
    }
}

function draw() {
    background(0, 180);

    if (start) {
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                let x = i * resolution;
                let y = j * resolution;
                if (grid[i][j] == 1) {
                    fill(255);
                    rect(x, y, resolution, resolution);
                }
            }
        }

        let next = make2DArray(cols, rows);

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                let state = grid[i][j];
                let sum = 0;
                let neighbors = countNeighbors(grid, i, j);

                if (state == 0 && neighbors == 3) {
                    next[i][j] = 1;
                } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
                    next[i][j] = 0;
                } else {
                    next[i][j] = state;
                }
            }
        }

        grid = next;

        pauseBtn.draw();

        if (pauseBtn.clicked() && buttonReady) {
            start = false;
            buttonReady = false;
        }

    } else {
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                let x = i * resolution;
                let y = j * resolution;
                if (grid[i][j] == 1) {
                    fill(255);
                    rect(x, y, resolution, resolution);
                }
            }
        }

        startBtn.draw();
        randomizeBtn.draw();
        clearBtn.draw();
        drawEraseBtn.draw();
        undoBtn.draw();

        if (buttonReady) {
            if (startBtn.clicked()) {
                start = true;
                buttonReady = false;

            } else if (randomizeBtn.clicked()) {
                for (let i = 0; i < cols; i++) {
                    for (let j = 0; j < rows; j++) {
                        grid[i][j] = floor(random(2));
                    }
                }

                buttonReady = false;

            } else if (clearBtn.clicked()) {
                for (let i = 0; i < cols; i++) {
                    for (let j = 0; j < rows; j++) {
                        grid[i][j] = 0;
                    }
                }

                buttonReady = false;
            } else if (drawEraseBtn.clicked()) {
                if (drawing) {
                    drawEraseBtn.text = "Erase";
                    drawing = false;
                } else {
                    drawEraseBtn.text = "Draw";
                    drawing = true;
                }

                buttonReady = false;
            } else if (undoBtn.clicked()) {
                grid = old_draw_grid;
                buttonReady = false;
            }
        }
    }

    if (!buttonReady) {
        bframe++;
    }

    if (bframe > 30) {
        bframe = 0;
        buttonReady = true;
    }
}

function countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            sum += grid[col][row];
        }
    }

    sum -= grid[x][y];
    return sum;
}