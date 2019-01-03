class Button {
    constructor(text, x, y, w, h = w, r = 0) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.r = r;
    }

    hovered() {
        return mouseX > this.x && mouseX < this.x + this.w &&
            mouseY > this.y && mouseY < this.y + this.h;
    }

    clicked() {
        return mouseIsPressed & this.hovered();
    }

    display() {
        fill(255);
        rect(this.x, this.y, this.w, this.h, this.r);
        let size = this.w > this.h ? this.h / 2 - 2 : this.w / 2 - 2;
        textSize(size);
        textAlign(CENTER, CENTER);
        fill(0);
        text(this.text, this.x + this.w / 2, this.y + this.h / 2);
        textAlign(LEFT, BOTTOM);
    }
}

Object.defineProperty(Array.prototype, -1, {
    get: function() {
        return this[this.length - 1];
    },

    set: function(val) {
        this[this.length - 1] = val;
    }
});

function props(obj, proto = false) {
    let props = [];
    for (let prop in obj) {
        if (proto) {
            if (obj.hasOwnProperty(prop)) {
                props.push(prop);
            }
        } else {
            props.push(prop);
        }
    }
    return props;
}

Array.prototype.sum = function() {
    return this.reduce((sum, val) => sum + val);
};

Array.prototype.sortProp = function(prop) {
    let array = this;
    array.sort((a, b) => {
        if (a[prop] > b[prop]) return 1;
        if (a[prop] < b[prop]) return -1;
        return 0;
    });
    return array;
};

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

p5.Vector.prototype.same = function(v) {
    return this.x === v.x && this.y === v.y && this.z === v.z;
};