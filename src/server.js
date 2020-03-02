const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');
const mediaHandler = require('./mediaHandler.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const handlePost = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/addUser') {
    const body = [];

    request.on('error', (err) => {
      console.dir(err);
      response.statusCode = 400;
      response.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });


    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);

      jsonHandler.addUser(request, response, bodyParams);
    });
  }
};



const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  switch (request.method) {
    case 'GET':
      if (parsedUrl.pathname === '/') {
        htmlHandler.getIndex(request, response);
      } else if (parsedUrl.pathname === '/style.css') {
        htmlHandler.getCSS(request, response);
      } else if (parsedUrl.pathname === '/getUsers') {
        jsonHandler.getUsers(request,response)
        //flappybox game files
      }else if (parsedUrl.pathname === '/getFlappy') {
          htmlHandler.getFlappy(request,response)
      }else if (parsedUrl.pathname === '/flappyMain.js') {
          htmlHandler.getFlappyMain(request,response)
      }else if (parsedUrl.pathname === '/phaser.min.js') {
          htmlHandler.getFlappyLibrary(request,response)
          //flappybox game media
      }else if (parsedUrl.pathname === '/bird.png') {
          mediaHandler.getFlappyBox(request,response)
      }else if (parsedUrl.pathname === '/pipe.png') {
          mediaHandler.getFlappyPipe(request,response)
        //sviper game files     
      } else if (parsedUrl.pathname === '/getSviper') {
        htmlHandler.getSviper(request, response);
      } else if (parsedUrl.pathname === '/main.js') {
        htmlHandler.getSviperMain(request, response);
      }else if (parsedUrl.pathname === '/loader.js') {
        htmlHandler.getSviperLoader(request, response);
      }else if (parsedUrl.pathname === '/utilities.js') {
        htmlHandler.getSviperUtilities(request, response);
      }else if (parsedUrl.pathname === '/classes.js') {
        htmlHandler.getSviperClasses(request, response);
        //sviper game media
      }else if (parsedUrl.pathname === '/move.png') {
        mediaHandler.getSviperCursor(request, response);
      }
      else if (parsedUrl.pathname === '/cloud1.png') {
        mediaHandler.getSviperCloud1(request, response);
      }
      else if (parsedUrl.pathname === '/cloud2.png') {
        mediaHandler.getSviperCloud2(request, response);
      }
      else if (parsedUrl.pathname === '/explosions.png') {
        mediaHandler.getSviperExplosion(request, response);
      }
      else if (parsedUrl.pathname === '/spaceship.png') {
        mediaHandler.getSviperSpaceship(request, response);
      }
      else if (parsedUrl.pathname === '/enemy.png') {
        mediaHandler.getSviperEnemy(request, response);
      }
      else {
        jsonHandler.notReal(request, response);
      }
      break;
    case 'HEAD':
      if (parsedUrl.pathname === '/getUsers') {
        jsonHandler.getUsersMeta(request, response);
      } else {
        jsonHandler.notRealMeta(request, response);
      }
      break;
    case 'POST':
      handlePost(request, response, parsedUrl);
      break;
    default:
      jsonHandler.notReal(request, response);
      break;
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
