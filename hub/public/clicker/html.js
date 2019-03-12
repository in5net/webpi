const moneyH = document.getElementById('money');
const dmoneyH = document.getElementById('dmoney');

document.getElementById('click').onclick = () => money += moneyMultiplier;
const productionDiv = document.getElementById('production');
const upgradesDiv = document.getElementById('upgrades');

function createButton(text, onclick) {
    let el = document.createElement('button');
    el.innerHTML = text;
    el.onclick = onclick;
    document.body.appendChild(el);
    return el;
}

function createAuto(name) {
    let div = document.createElement('div');
    div.className = 'auto';

    let b = createButton(name);
    b.onclick = (function() {
        let a = autos[this.textContent];
        if (money >= a.cost) {
            money -= a.cost;
            a.cost *= buyMultiplier;
            a.count++;

            p.textContent = `Count: ${a.count} -- Cost: ${a.cost.toFixed(2)} -- MPS: ${a.mps}`;
        }
    }).bind(b);
    div.appendChild(b);

    let p = document.createElement('p');
    let a = autos[name];
    p.textContent = `Count: ${a.count} -- Cost: ${a.cost.toFixed(2)} -- MPS: ${a.mps}`;
    b.p = p;
    div.appendChild(p);

    productionDiv.appendChild(div);
    return div;
}

function createUpgrade(name) {
    let div = document.createElement('div');
    div.className = 'auto';

    let b = createButton(name);
    b.onclick = (function() {
        let u = upgrades[this.textContent];
        if (money >= u.cost) {
            money -= u.cost;
            u.onbuy();
            u.deleteHTML();
        }
    }).bind(b);
    div.appendChild(b);

    let p = document.createElement('p');
    let u = upgrades[name];
    p.textContent = `Cost: ${u.cost.toFixed(2)}`;
    b.p = p;
    div.appendChild(p);

    upgradesDiv.appendChild(div);
    return div;
}