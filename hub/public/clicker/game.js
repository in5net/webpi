let dmoney = 0;

setInterval(() => {
    let sum = 0;
    for (let prop in autos) {
        if (autos.hasOwnProperty(prop))
            sum += autos[prop].collect();
    }
    dmoney = sum;
    money += dmoney / fps;
}, 1000 / fps);

function checkBtns() {
    for (let prop in autos) {
        if (autos.hasOwnProperty(prop)) {
            let a = autos[prop];
            if (money >= a.cost * unlockPercent && !a.btnMade) {
                a.makeBtn();
                a.btnMade = true;
            }
        }
    }
}

(function updateScreen() {
    checkBtns();

    moneyH.innerHTML = '$' + round(money, 2);
    dmoneyH.innerHTML = (dmoney >= 0 ? '+' : '') + dmoney;

    window.requestAnimationFrame(updateScreen);
})();