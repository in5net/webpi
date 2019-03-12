class Auto {
    constructor(name, cost, mps) {
        this.name = name;
        this.mps = mps;
        this.cost = cost;
        this.count = 0;
        this.htmlMade = false;
    }

    collect() {
        return this.count * this.mps;
    }

    createHTML() {
        this.html = createAuto(this.name);
    }

    deleteHTML() {
        this.html.remove();
    }
}

function auto(name, cost, mps) {
    autos[name] = new Auto(name, cost, mps);
}

class Upgrade {
    constructor(name, cost, onbuy, conditionToShow) {
        this.name = name;
        this.cost = cost;
        this.onbuy = onbuy;
        this.conditionToShow = conditionToShow || Upgrade.defaultCondition;
        this.htmlMade = false;
    }

    static defaultCondition() {
        return money >= this.cost * unlockPercent;
    }

    createHTML() {
        this.html = createUpgrade(this.name);
    }

    deleteHTML() {
        this.html.remove();
    }
}

function upgrade(name, cost, onbuy, conditionToShow) {
    upgrades[name] = new Upgrade(name, cost, onbuy, conditionToShow);
}