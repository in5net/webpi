// MONEY
let money = 0;
let moneyMultiplier = 1;
const buyMultiplier = 1.05;

// PROGRESS
const unlockPercent = 0.7;

// GAME EXPERIENCE
const fps = 60;

const autos = {};
const upgrades = {};

// PRODUCTION (name, cost, moneyPerSecond)
auto('Tetris', 20, 1);
auto('Pac-Man', 80, 3);
auto('Minesweeper', 300, 5);
auto('Must-a-mine', 1000, 10);
auto('Minecraft', 2000, 25);
auto('Roblox', 5000, 65);
auto('Subnautica', 7000, 100);
auto('PUBG', 10000, 200);
auto('Realm Royale', 20000, 500);
auto('Fortnite', 50000, 1000);

// UPGRADES (name, cost, whenYouBuy)
upgrade('2x money production', 100, () => {
    moneyMultiplier *= 2;
});