class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    copy() {
        return vec(this.x, this.y);
    }

    angle(angle) {
        if (angle !== undefined) {
            let length = this.length();
            this.x = Math.cos(angle) * length;
            this.y = Math.sin(angle) * length;
            return this;
        } else
            return Math.atan2(this.y, this.x);
    }

    length(length) {
        if (length !== undefined) {
            let angle = this.angle();
            this.x = Math.cos(angle) * length;
            this.y = Math.sin(angle) * length;
            return this;
        } else
            return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    mult(n) {
        this.x *= n;
        this.y *= n;
        return this;
    }

    div(n) {
        this.x /= n;
        this.y /= n;
        return this;
    }

    static add(v1, v2) {
        return vec(v1.x + v2.x, v1.y + v2.y);
    }

    static sub(v1, v2) {
        return vec(v1.x - v2.x, v1.y - v2.y);
    }

    static mult(v, n) {
        return vec(v.x * n, v.y * n);
    }

    static div(v, n) {
        return vec(v.x / n, v.y / n);
    }
}

function vec(x, y) {
    return new Vector(x, y);
}