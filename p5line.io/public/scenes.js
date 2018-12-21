function showHTML() {
    if (showStartScreen) {
        game_title.show();
        length.show();
        name_input.show();
        code_input.show();
        leader_title.hide()
        leaderboard.hide();

        for (let b in buttons) {
            buttons[b].show();
        }

        for (let b in adminBtns) {
            adminBtns[b].hide();
        }
    } else {
        game_title.hide();
        length.hide();
        name_input.hide();
        code_input.hide();
        leader_title.show();
        leaderboard.show();

        for (let b in buttons) {
            buttons[b].hide();
        }

        if (player.isAdmin) {
            for (let b in adminBtns) {
                adminBtns[b].show();
            }
        }
    }
}

function gameScene() {
    noFill();
    strokeWeight(2);
    stroke(255);
    rect(0, 0, edge.w, edge.h);

    if (frameCount % 20 === 0) {
        masses.push(new Mass());
    }

    if (player.alive) {
        for (let mass of masses) {
            if (mass.eatenBy(player)) {
                player.addLength(5);
                player.applyForce(accMass);
                let idx = masses.indexOf(mass);
                masses.splice(idx, 1);
            }
        }
    }

    for (let mass of masses) {
        mass.update();
        mass.display();
    }

    data();
}

function data() {
    push();
    translate(player.pos.x - width / 2, player.pos.y - height / 2);

    fill(255);
    strokeWeight(0);
    textSize(12);
    text('Length: ' + player.length, 50, height - 145);

    if (debug) {
        text('Mass: ' + masses.length, 10 + 80 * 0, 30);
        text('Vel: ' + round(player.vel * 10) / 10, 10 + 80 * 1, 30);
        text('Turns: ' + player.turnPoints.length, 10 + 80 * 2, 30);
        text('Fps: ' + round(frameRate() * 10) / 10, 10 + 80 * 3, 30);
        text('Players: ' + (players.length + 1), 10 + 80 * 4, 30);
    }

    if (frameCount % 60 * 3 === 0) {
        let places = leaderboard.elt.children[1].children;
        let pls = players.slice();
        pls.push(player);

        let sorted = reverse(pls.sortProp('length'));

        for (let i = 0; i < places.length; i++) {
            let pl = sorted[i];
            let place = places[i].children;

            place[1].innerHTML = pl !== undefined ? pl.name : '';
            place[2].innerHTML = pl !== undefined ? pl.length : '';
        }
    }

    fill(50, 100);
    stroke(255);
    strokeWeight(1);
    rect(40, height - 140, 100, 100);
    noFill();
    strokeWeight(1);
    for (let p of players) {
        if (p.alive) {
            beginShape();
            for (let pt of p.points) {
                let mapped = {
                    x: map(pt.x, 0, edge.w, 40, 140),
                    y: map(pt.y, 0, edge.h, height - 140, height - 40)
                };

                stroke(255);
                vertex(mapped.x, mapped.y);
            }
            endShape();
        }
    }

    if (player.alive) {
        beginShape();
        for (let pt of player.points) {
            let mapped = {
                x: map(pt.x, 0, edge.w, 40, 140),
                y: map(pt.y, 0, edge.h, height - 140, height - 40)
            };

            stroke(255, 255, 0);
            vertex(mapped.x, mapped.y);
        }
        endShape();
    }

    pop();
}