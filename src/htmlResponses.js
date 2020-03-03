//for loading required html,js and css files
const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

const sviper = fs.readFileSync(`${__dirname}/../sviper/game.html`);
const sviperMain = fs.readFileSync(`${__dirname}/../sviper/js/main.js`);
const sviperLoader = fs.readFileSync(`${__dirname}/../sviper/js/loader.js`);
const sviperUtilities= fs.readFileSync(`${__dirname}/../sviper/js/utilities.js`);
const sviperClasses = fs.readFileSync(`${__dirname}/../sviper/js/classes.js`);

const flappy = fs.readFileSync(`${__dirname}/../flappybox/index.html`);
const flappyMain = fs.readFileSync(`${__dirname}/../flappybox/flappyMain.js`);
const flappyLibrary = fs.readFileSync(`${__dirname}/../flappybox/phaser.min.js`);

const custom404 = fs.readFileSync(`${__dirname}/../client/404.html`);

const get404 = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.write(custom404);
  response.end();
};

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getFlappy = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(flappy);
  response.end();
};

const getFlappyMain = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  response.write(flappyMain);
  response.end();
};

const getFlappyLibrary = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  response.write(flappyLibrary);
  response.end();
};

const getSviper = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(sviper);
  response.end();
};



const getSviperMain = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  response.write(sviperMain);
  response.end();
};

const getSviperLoader = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  response.write(sviperLoader);
  response.end();
};

const getSviperUtilities = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  response.write(sviperUtilities);
  response.end();
};

const getSviperClasses = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  response.write(sviperClasses);
  response.end();
};





const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

module.exports = {
  getIndex,
  getCSS,
  getSviper,
  getSviperMain,
  getSviperLoader,
  getSviperClasses,
  getSviperUtilities,
  getFlappy,
  getFlappyMain,
  getFlappyLibrary,
  get404

};
