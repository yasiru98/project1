const fs = require('fs');
const sviperCursor = fs.readFileSync(`${__dirname}/../sviper/images/move.png`);
const sviperCloud1 = fs.readFileSync(`${__dirname}/../sviper/images/cloud1.png`);
const sviperCloud2 = fs.readFileSync(`${__dirname}/../sviper/images/cloud2.png`);
const sviperExplosion = fs.readFileSync(`${__dirname}/../sviper/images/explosions.png`);
const sviperSpaceShip = fs.readFileSync(`${__dirname}/../sviper/images/SpaceShip.png`);
const sviperEnemy = fs.readFileSync(`${__dirname}/../sviper/images/enemy.png`);

const flappyBox = fs.readFileSync(`${__dirname}/../flappybox/assets/bird.png`);
const flappyPipe = fs.readFileSync(`${__dirname}/../flappybox/assets/pipe.png`);

const getFlappyPipe = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'image/png' });
    response.write(flappyPipe);
    response.end();
};

const getFlappyBox= (request, response) => {
    response.writeHead(200, { 'Content-Type': 'image/png' });
    response.write(flappyBox);
    response.end();
};



const getSviperCursor = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'image/png' });
    response.write(sviperCursor);
    response.end();
  };

const getSviperCloud1= (request, response) => {
    response.writeHead(200, { 'Content-Type': 'image/png' });
    response.write(sviperCloud1);
    response.end();
};

const getSviperCloud2 = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'image/png' });
    response.write(sviperCloud2);
    response.end();
};
const getSviperExplosion = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'image/png' });
    response.write(sviperExplosion);
    response.end();
};
const getSviperSpaceship = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'image/png' });
    response.write(sviperSpaceShip);
    response.end();
};
const getSviperEnemy = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'image/png' });
    response.write(sviperEnemy);
    response.end();
};
  module.exports = {
    getSviperCursor,
    getSviperCloud1,
    getSviperCloud2,
    getSviperEnemy,
    getSviperSpaceship,
    getSviperExplosion,
    getFlappyBox,
    getFlappyPipe
  };