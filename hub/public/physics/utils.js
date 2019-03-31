const utils = {
    norm: function(value, min, max) {
        return (value - min) / (max - min);
    },

    lerp: function(norm, min, max) {
        return (max - min) * norm + min;
    },

    map: function(value, sourceMin, sourceMax, destMin, destMax) {
        return utils.lerp(utils.norm(value, sourceMin, sourceMax), destMin, destMax);
    },

    clamp: function(value, min, max) {
        return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
    },

    dist: function(x1, y1, x2, y2) {
        let dx = x2 - x1,
            dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    },

    pointDist: function(p1, p2) {
        return utils.dist(p1.x, p1.y, p2.x, p2.y);
    },

    circleCollision: function(c1, c2) {
        let dx = c2.x - c1.x,
            dy = c2.y - c1.y;
        return dx * dx + dy * dy <= Math.pow(c1.radius + c2.radius, 2);
    },

    circlePointCollision: function(x, y, circle) {
        let dx = circle.x - x,
            dy = circle.y - y;
        return dx * dx + dy * dy <= circle.radius * circle.radius;
    },

    pointInRect: function(x, y, rect) {
        return utils.inRange(x, rect.x, rect.x + rect.width) &&
            utils.inRange(y, rect.y, rect.y + rect.height);
    },

    inRange: function(value, min, max) {
        return value >= Math.min(min, max) && value <= Math.max(min, max);
    },

    rangeIntersect: function(min1, max1, min2, max2) {
        return Math.max(min1, max1) >= Math.min(min2, max2) &&
            Math.min(min1, max1) <= Math.max(min2, max2);
    },

    rectIntersect: function(r1, r2) {
        return utils.rangeIntersect(r1.x, r1.x + r1.width, r2.x, r2.x + r2.width) &&
            utils.rangeIntersect(r1.y, r1.y + r1.height, r2.y, r2.y + r2.height);
    },

    radians: function(degrees) {
        return degrees / 180 * Math.PI;
    },

    degrees: function(radians) {
        return radians * 180 / Math.PI;
    },

    random: function(min, max = 0) {
        return min + Math.random() * (max - min);
    },

    randomInt: function(min, max = 0) {
        return Math.floor(min + Math.random() * (max - min + 1));
    },

    randomDist: function(min, max, iterations) {
        let total = 0;
        for (let i = 0; i < iterations; i++) {
            total += utils.random(min, max);
        }
        return total / iterations;
    },

    roundToPlaces: function(value, places = 0) {
        let mult = Math.pow(10, places);
        return Math.round(value * mult) / mult;
    },

    roundNearest: function(value, nearest) {
        return Math.round(value / nearest) * nearest;
    }
};