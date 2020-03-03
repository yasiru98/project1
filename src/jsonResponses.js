//for responding to API requests
// Note this object is purely in memory
const sviperUsers = {};
const flappyUsers = {};

const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.end();

};
//check accept header parameters and send high score data
const getUsers = (request, response) => {
  let responseJSON ;
  const game = request.headers.accept.split(',');
  console.log(game[1]==="sviper");
  if(game[1]==="sviper"){
    responseJSON = sviperUsers;
  }
  else if(game[1]==="flappybox"){
    responseJSON = flappyUsers;
  }
  else {
    responseJSON = {
    sviperUsers,
    flappyUsers
    }
  }

  return respondJSON(request, response, 200, responseJSON);
};
//check body parameters and add high score data from the user
const addUser = (request, response, body) => {
  const responseJSON = {
    message: 'Username and age are both required',
    playMessage: 'Please play the game first',
    ageMessage: 'Please enter or pick an appropriate age',
    nameMessage:'Username should be at least 4 characters and less than 11 characters'
  };

  if (!body.name || !body.age || !body.score) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON.message);
  }
  else if (body.score === "null" || body.score === "0") {
    responseJSON.id = 'missingScore';
    return respondJSON(request, response, 400, responseJSON.playMessage);
  }
  else if (body.age === "0") {
    responseJSON.id = 'missingAge';
    return respondJSON(request, response, 400, responseJSON.ageMessage);
  }
  else if (body.name.length < 4 || body.name.length > 10) {
    responseJSON.id = 'missingName';
    return respondJSON(request, response, 400, responseJSON.nameMessage);
  }
  let responseCode = 201; // created response code
  if(body.game === "sviper"){
    
    if (sviperUsers[body.name]) {
      responseCode = 204; // updated response code
    } else {
      sviperUsers[body.name] = {};
    }


    sviperUsers[body.name].name = body.name;
    sviperUsers[body.name].age = body.age;
    sviperUsers[body.name].score = body.score;

  }
  else if(body.game === "flappy"){
    if (flappyUsers[body.name]) {
      responseCode = 204; // updated response code
    } else {
      flappyUsers[body.name] = {};
    }
    flappyUsers[body.name].name = body.name;
    flappyUsers[body.name].age = body.age;
    flappyUsers[body.name].score = body.score;
  }
  if (responseCode === 201) {
    responseJSON.message = 'Score Submitted Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};


const getUsersMeta = (request, response) => respondJSONMeta(request, response, 200);

const notReal = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, responseJSON);
};

const notRealMeta = (request, response) => respondJSONMeta(request, response, 404);

module.exports = {
  getUsers,
  getUsersMeta,
  addUser,
  notReal,
  notRealMeta,
};
