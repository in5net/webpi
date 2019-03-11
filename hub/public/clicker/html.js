const moneyH = document.getElementById('money');
const dmoneyH = document.getElementById('dmoney');
createButton('Click', () => money++).id = 'click';

function createButton(text, onclick) {
    let el = document.createElement('button');
    el.innerHTML = text;
    el.onclick = onclick;
    document.body.appendChild(el);
    return el;
}

function createAdder(type) {
    let div = document.createElement('div');
    div.className = 'adder';

    let b = createButton(type);
    b.onclick = (function() {
        let a = autos[this.autoType];
        if (money >= a.cost) {
            money -= a.cost;
            a.cost *= buyMultiplier;
            a.count++;

            p.innerHTML = `Count: ${a.count} -- Cost: ${round(a.cost, 2)}`;
        }
    }).bind(b);
    b.autoType = type;
    div.appendChild(b);

    let p = document.createElement('p');
    let a = autos[type];
    p.innerHTML = `Count: ${a.count} -- Cost: ${round(a.cost, 2)}`;
    b.p = p;
    div.appendChild(p);

    document.body.appendChild(div);
}