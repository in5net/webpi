// MONEY
let money = Number.MAX_VALUE;
let moneyMultiplier = 1;
let buyMultiplier = 1.1;

// PROGRESS
const unlockPercent = 0.7;

// GAME EXPERIENCE
const fps = 60;

const autos = {};
const upgrades = {};

// PRODUCTION (name, cost, moneyPerSecond)
auto('Tetris', 20, 1);
auto('Pac-man', 80, 3);
auto('Minesweeper', 300, 5);
auto('Must-a-mine', 1000, 10);
auto('Minecraft', 2000, 25);
auto('Roblox', 5000, 65);
auto('Subnautica', 7000, 100);
auto('PUBG', 10000, 200);
auto('Realm Royale', 20000, 500);
auto('Fortnite', 50000, 1000);
auto("Hitchhiker's Guide to the Galaxy", 100000, 3000);
auto('Splix.io', 300000, 5000);
auto('LittleBigSnake', 600000, 10000);
auto('Slime Rancher', 1000000, 25000);

// UPGRADES (name, cost, whenYouBuy, [conditionToShow])
upgrade('Play games more intense', 300, () => moneyMultiplier += 0.1);
upgrade('Choose Pepsi over Diet Pepsi', 900, () => moneyMultiplier += 0.15);
upgrade("Plan to not play Fortnite too much", 1500, () => moneyMultiplier += 0.5);
upgrade('Order pizza from anywhere but Papa Johns and Jets', 1000, () => moneyMultiplier += 0.2);
upgrade('Decrease buy multiplier by 1%', 10000, () => buyMultiplier -= 0.01);
upgrade('Play many versions of Pac-man', 100, () => moneyMultiplier += 0.03, () => autos['Pac-man'].count >= 10);
upgrade('Drink more water', 2100, () => moneyMultiplier += 0.2);
upgrade('Get PUBG Mobile PC emulator', 15000, () => moneyMultiplier += 0.3, d => autos['PUBG'].count >= 10 && d());
upgrade('Google something', 100000, () => moneyMultiplier += 0.1);
upgrade('Download Firefox', 23000, () => moneyMultiplier += 0.05);
upgrade('Stream on Youtube', 50000, () => money += 51000);
upgrade('Aimbot', 150000, () => moneyMultiplier *= 1.5, d => (autos['PUBG'].count >= 15 || autos['Fortnite'].count >= 15 || autos['Realm Royale'].count >= 15) && d());