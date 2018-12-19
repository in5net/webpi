function setHTML() {
    p5.Element.prototype.addPos = function(x = 0, y = 0) {
        let pos = this.position();
        this.position(pos.x + x, pos.y + y);
        return this;
    };

    p5.Element.prototype.topWall = function() {
        let pos = this.position();
        this.position(pos.x, 0);
        return this;
    };

    p5.Element.prototype.rightWall = function() {
        let size = this.size();
        let pos = this.position();
        this.position(width - size.width, pos.y);
        return this;
    };

    game_title = createElement('h1', 'p5line.io')
        .style('font-size', '100px')
        .position(0, 0)
        .center('horizontal');

    length = createElement('h2', 'Length: 10')
        .style('font-size', '36px')
        .center()
        .addPos(0, -120);

    name_input = createInput('', 'text')
        .size(200, 30)
        .center()
        .attribute('placeholder', 'Player name');

    code_input = createInput('', 'text')
        .size(100, 30)
        .center()
        .addPos(160)
        .attribute('placeholder', 'Code');

    leaderboard = createDiv()
        .class('leaderboard')
        .size(250)
        .topWall()
        .rightWall()
        .addPos(-15, 65);

    leader_title = createElement('h2', 'Leaderboard')
        .style('margin', '2px')
        .parent(leaderboard);

    board = createDiv()
        .class('board')
        .parent(leaderboard);

    for (let i = 0; i < 10; i++) {
        let place = createDiv().class('place');
        createP((i + 1) + '.').class('lead-data').parent(place); // Place number
        createP('---').class('lead-data').parent(place); // Player name
        createP('-').class('lead-data').parent(place); // Player score

        place.parent(board);
    }

    buttons = {
        play: createButton('Play')
            .size(200, 30)
            .center()
            .addPos(0, 50)
            .mousePressed(() => {
                let name = name_input.value() || 'player' + round(random(0, 1000));
                let code = code_input.value();

                player.name = name;
                socket.emit('checkCode', code);

                showStartScreen = false;
                player.reset(random(edge.w), random(edge.h), 10);
            }),

        detail: createButton('High Detail')
            .size(200, 30)
            .center()
            .addPos(0, 100)
            .mousePressed(() => {
                if (highDetail) {
                    buttons.detail.html('Low detail');
                    highDetail = false;
                } else {
                    buttons.detail.html('High detail');
                    highDetail = true;
                }
            }),

        debug: createButton('Debug: off')
            .size(200, 30)
            .center()
            .addPos(0, 150)
            .mousePressed(() => {
                if (debug) {
                    buttons.debug.html('Debug: off');
                    debug = false;
                } else {
                    buttons.debug.html('Debug: on');
                    debug = true;
                }
            })
    };

    adminBtns = {
        moreMap: createButton('Map +')
            .size(70, 30)
            .center()
            .rightWall()
            .addPos(0, -15)
            .mousePressed(() => {
                socket.emit('admin', 'map', newEdge.w + 60);
            }),

        lessMap: createButton('Map -')
            .size(70, 30)
            .center()
            .rightWall()
            .addPos(0, 15)
            .mousePressed(() => {
                socket.emit('admin', 'map', newEdge.w - 60);
            })
    };
}