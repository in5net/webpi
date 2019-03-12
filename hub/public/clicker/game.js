let dmoney = 0;

setInterval(() => {
    let sum = 0;
    for (let prop in autos) {
        if (autos.hasOwnProperty(prop))
            sum += autos[prop].collect();
    }
    dmoney = sum;
    money += dmoney / fps * moneyMultiplier;
}, 1000 / fps);

function checkBtns() {
    for (let prop in autos) {
        if (autos.hasOwnProperty(prop)) {
            let a = autos[prop];
            if (money >= a.cost * unlockPercent && !a.htmlMade) {
                a.createHTML();
                a.htmlMade = true;
            }
        }
    }

    for (let prop in upgrades) {
        if (upgrades.hasOwnProperty(prop)) {
            let u = upgrades[prop];
            if (u.conditionToShow(Upgrade.defaultCondition) && !u.htmlMade) {
                u.createHTML();
                u.htmlMade = true;
            }
        }
    }
}

(function updateScreen() {
    checkBtns();

    moneyH.innerHTML = '$' + money.toFixed(2);
    dmoneyH.innerHTML = (dmoney >= 0 ? '+' : '') + dmoney + '  x' + moneyMultiplier;

    window.requestAnimationFrame(updateScreen);
})();