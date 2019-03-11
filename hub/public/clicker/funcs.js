class Auto {
    constructor(name, mps, cost) {
        this.name = name;
        this.mps = mps;
        this.cost = cost;
        this.count = 0;
        this.btnMade = false;
    }

    makeBtn() {
        createAdder(this.name);
    }

    collect() {
        return this.count * this.mps;
    }
}

function makeAuto(name, mps, cost) {
    return new Auto(name, mps, cost);
}

function round(num, places) {
    let powTen = Math.pow(10, places);
    return Math.round(num * powTen) / powTen;
}