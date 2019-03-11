const autos = {
    'Tetris': makeAuto('Tetris', 1, 20),
    'Pac-Man': makeAuto('Pac-Man', 3, 80),
    'Minesweeper': makeAuto('Minesweeper', 5, 300),
    'Must-a-mine': makeAuto('Must-a-mine', 10, 1000),
    'Minecraft': makeAuto('Minecraft', 25, 2000),
    'Roblox': makeAuto('Roblox', 65, 5000),
    'Subnautica': makeAuto('Subnautica', 100, 7000),
    'PUBG': makeAuto('PUBG', 200, 10000),
    'Realm Royale': makeAuto('Realm Royale', 500, 20000),
    'Fortnite': makeAuto('Fortnite', 1000, 50000),
};

let money = 0;

const fps = 60;
const buyMultiplier = 1.05;
const unlockPercent = 0.7;