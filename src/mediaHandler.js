//for loading required game media files
const fs = require("fs");
const path = require('path');

const sviperCursor = fs.readFileSync(`${__dirname}/../sviper/images/move.png`);
const sviperCloud1 = fs.readFileSync(
  `${__dirname}/../sviper/images/cloud1.png`
);
const sviperCloud2 = fs.readFileSync(
  `${__dirname}/../sviper/images/cloud2.png`
);
const sviperExplosion = fs.readFileSync(
  `${__dirname}/../sviper/images/explosions.png`
);
const sviperSpaceShip = fs.readFileSync(
  `${__dirname}/../sviper/images/SpaceShip.png`
);
const sviperEnemy = fs.readFileSync(`${__dirname}/../sviper/images/enemy.png`);

const flappyBox = fs.readFileSync(`${__dirname}/../flappybox/assets/bird.png`);
const flappyPipe = fs.readFileSync(`${__dirname}/../flappybox/assets/pipe.png`);

const notFoundSponge = fs.readFileSync(`${__dirname}/../client/spongegar.png`);

function loadMedia(request, response, location, type) {
  const file = path.resolve(__dirname, location);

  fs.stat(file, (err, stats) => {
    if (err) {
      if (err.code === "ENOENT") {
        response.writeHead(404);
      }
      return response.end(err);
    }

    let { range } = request.headers;

    if (!range) {
      range = "bytes=0-";
    }

    const positions = range.replace(/bytes=/, "").split("-");

    let start = parseInt(positions[0], 10);

    const total = stats.size;
    const end = positions[1] ? parseInt(positions[1], 10) : total - 1;

    if (start > end) {
      start = end - 1;
    }

    const chunkSize = end - start + 1;

    response.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${total}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": type
    });

    const stream = fs.createReadStream(file, { start, end });

    stream.on("open", () => {
      stream.pipe(response);
    });

    stream.on("error", streamErr => {
      response.end(streamErr);
    });

    return stream;
  });
}
//404 page image
const getNotFoundSponge = (request, response) => {
    response.writeHead(200, { "Content-Type": "image/png" });
    response.write(notFoundSponge);
    response.end();
};
//flappy box game files
const getFlappyJump = (request, response) => {
  loadMedia(request, response, '../flappybox/assets/jump.wav', 'audio/wav');
};

const getFlappyPipe = (request, response) => {
  response.writeHead(200, { "Content-Type": "image/png" });
  response.write(flappyPipe);
  response.end();
};

const getFlappyBox = (request, response) => {
  response.writeHead(200, { "Content-Type": "image/png" });
  response.write(flappyBox);
  response.end();
};
//sviper game files
const getSviperCursor = (request, response) => {
  response.writeHead(200, { "Content-Type": "image/png" });
  response.write(sviperCursor);
  response.end();
};

const getSviperCloud1 = (request, response) => {
  response.writeHead(200, { "Content-Type": "image/png" });
  response.write(sviperCloud1);
  response.end();
};

const getSviperCloud2 = (request, response) => {
  response.writeHead(200, { "Content-Type": "image/png" });
  response.write(sviperCloud2);
  response.end();
};
const getSviperExplosion = (request, response) => {
  response.writeHead(200, { "Content-Type": "image/png" });
  response.write(sviperExplosion);
  response.end();
};
const getSviperSpaceship = (request, response) => {
  response.writeHead(200, { "Content-Type": "image/png" });
  response.write(sviperSpaceShip);
  response.end();
};
const getSviperEnemy = (request, response) => {
  response.writeHead(200, { "Content-Type": "image/png" });
  response.write(sviperEnemy);
  response.end();
};

const getSviperAsteroid = (request, response) => {
    loadMedia(request, response, '../sviper/sounds/explosion_asteroid.wav', 'audio/wav');
};
const getSviperHit = (request, response) => {
    loadMedia(request, response, '../sviper/sounds/hit.flac', 'audio/flac');
};
const getSviperPower = (request, response) => {
    loadMedia(request, response, '../sviper/sounds/powerup.ogg', 'audio/ogg');
};

const getSviperWeponEnemy = (request, response) => {
    loadMedia(request, response, '../sviper/sounds/weapon_enemy.wav', 'audio/wav');
};

const getSviperWeponPlayer = (request, response) => {
    loadMedia(request, response, '../sviper/sounds/weapon_player.wav', 'audio/wav');
};
  
  
module.exports = {
  getSviperCursor,
  getSviperCloud1,
  getSviperCloud2,
  getSviperEnemy,
  getSviperSpaceship,
  getSviperExplosion,
  getFlappyBox,
  getFlappyPipe,
  getFlappyJump,
  getSviperAsteroid,
  getSviperHit,
  getSviperPower,
  getSviperWeponEnemy,
  getSviperWeponPlayer,
  getNotFoundSponge
};
