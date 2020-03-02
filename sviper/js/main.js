// We will use `strict mode`, which helps us by having the browser catch many common JS mistakes
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
"use strict";
const app = new PIXI.Application(800,600);
app.renderer.backgroundColor = 0x0080FF;
let div = document.getElementById('canvas-container');
div.appendChild(app.view);

// constants
const sceneWidth = app.view.width;
const sceneHeight = app.view.height;
const prefix = "yik4325-"; // change 'abc1234' to your banjo id
const scoreKey = prefix + "score";
let storedScore = localStorage.getItem(scoreKey);

let globalVariable={
    score: storedScore,
 };
// aliases
let stage;

// game variables
let startScene;
let gameScene,ship,scoreLabel,lifeLabel,shootSound,hitSound,fireballSound,cloud,enemy,highScoreLabel, starthighScoreLabel,enemyShootSound,health,rage,powerUpSound;
let gameOverScene;
let gameOverScoreLabel;

//arrays and numbers
let powerUps = [];
let bullets = [];
let enemyBullets = [];
let enemies = [];
let clouds = [];
let explosions = [];
let explosionTextures;
let score = 0;
let life = 100;
let levelNum = 1;
let paused = true;





function setup() {
	stage = app.stage;
	// #1 - Create the `start` scene
    startScene = new PIXI.Container();

    stage.addChild(startScene);
	// #2 - Create the main `game` scene and make it invisible
    gameScene = new PIXI.Container();
    gameScene.visible = false;
    stage.addChild(gameScene);
	// #3 - Create the `gameOver` scene and make it invisible
	gameOverScene = new PIXI.Container();
    gameOverScene.visible = false;
    stage.addChild(gameOverScene);
	// #4 - Create labels for all 3 scenes
    createLabelsAndButtons();
    

    // #5 - Create ships
    ship = new Ship();
 
    gameScene.addChild(ship);
  
	// #6 - Load Sounds
  	shootSound = new Howl({
        src: ['sounds/weapon_player.wav']
    });
    
    hitSound = new Howl({
        src: ['sounds/hit.flac']
    });
    
    fireballSound = new Howl({
        src: ['sounds/explosion_asteroid.wav']
    });

    enemyShootSound = new Howl({
        src: ['sounds/weapon_enemy.wav']
    });

    powerUpSound = new Howl({
        src: ['sounds/powerup.ogg']
    });
	// #7 - Load sprite sheet
    explosionTextures = loadSpriteSheet();
	// #8 - Start update loop
	app.ticker.add(gameLoop);
	// #9 - Start listening for click events on the canvas
	app.view.onclick = fireBullet;
	// Now our `startScene` is visible
    // Clicking the button calls startGame()


}

function startGame(){

    paused = false;
    startScene.visible = false;
    gameOverScene.visible = false;
    gameScene.visible = true;

    levelNum = 1;
    score = 0;
    life = 100;
    increasesScoreBy(0);
    decreaseLifeBy(0);
    ship.x = 300;
    ship.y = 550;
    loadLevel();

    
    clouds = [];
    enemies = [];
    enemyBullets = [];

    if(gameScene.visible){

   //spawn enemies and clouds on a timer
   let spawnEnemies =  window.setInterval(function()
    {
        if(paused==true){//stop spawning enemy bullets if game is paused
            clearInterval(spawnEnemies);
            }
        for(let enemy of enemies){

            if(enemy.isAlive ){
           
                let b = new EnemyBullet(0xFF0000, enemy.x,enemy.y);
                enemyBullets.push(b);
                gameScene.addChild(b);
                enemyShootSound.play();
          
        }
        }
    }
    , 2000);
    

  let spawnClouds =  window.setInterval(function()
    {
        if(paused==true){//stop spawning clouds if game is paused
            clearInterval(spawnClouds);
            }
         let minX = 0;
        let maxX = sceneWidth;
        let x = Math.random() * (maxX - minX) + minX;
        cloud = new Cloud(x);
        gameScene.addChild(cloud);
        clouds.push(cloud);
    }
    , 1000);


    window.setInterval(function()
    {
         let minX = 0;
        let maxX = sceneWidth;
        let x = Math.random() * (maxX - minX) + minX;
        enemy = new Enemy(x);
        gameScene.addChild(enemy);
        enemies.push(enemy);
    }
    , 1000);  
    }
    
    //spawn power ups
    
    let spawnPowerUps =  window.setInterval(function()
    {
        if(paused==true){//stop spawning powerups if game is paused 
            clearInterval(spawnPowerUps);
            }
        createPowerUps();
    }
    , 20000);
}

 //make text labels for menues   
function createLabelsAndButtons(){
    let buttonStyle = new PIXI.TextStyle({
        fill: 0xFF0000,
        fontSize: 48,
        fontFamily: "Luckiest Guy"
    });

    let startLabel1 = new PIXI.Text("SVIPER");
    startLabel1.style = new PIXI.TextStyle({
        fill: 0x00FFFF,
        fontSize: 120,
        fontFamily: "Faster One", 
        stroke: 0x00000,
        strokeThickness: 6
    });

    startLabel1.x = 100;
    startLabel1.y = 120;
    startScene.addChild(startLabel1);

      
    let startButton = new PIXI.Text("PLAY");
    startButton.style = buttonStyle;
    startButton.x = 300;
    startButton.y = sceneHeight - 300;
    startButton.interactive = true;
    startButton.buttonMode = true;

    startButton.on("pointerup",startGame);
    startButton.on("pointerover",e=>e.target.alpha = 0.7);
    startButton.on("pointerout",e=>e.currentTarget.alpha = 1.0);
    startScene.addChild(startButton);

    startButton.on("pointerup",startGame);
    startButton.on("pointerover",e=>e.target.alpha = 0.7);
    startButton.on("pointerout",e=>e.currentTarget.alpha = 1.0);
    startScene.addChild(startButton);

    let textStyle = new PIXI.TextStyle({
        fill: 0xFFFFFF,
        fontSize: 20,
        fontFamily: "Bree Serif",
        stroke: 0x000000,
        strokeThickness: 4
    });

    let instructionLabel = new PIXI.Text("Press Right Click to Shoot.\nMove with the Mouse.\nCollect power ups for rewards.");
    instructionLabel.style = new PIXI.TextStyle({
        fill: 0x000000,
        fontSize: 30,
        fontFamily: "Bree Serif", 
        stroke: 0x00FFFF,
        strokeThickness: 4
    });

    instructionLabel.x = 40;
    instructionLabel.y = 470;
    startScene.addChild(instructionLabel);


    scoreLabel = new PIXI.Text();
    scoreLabel.style = textStyle;
    scoreLabel.x = sceneWidth/2-40;
    scoreLabel.y = 5;
    gameScene.addChild(scoreLabel);
    increasesScoreBy(0);

    lifeLabel = new PIXI.Text();
    lifeLabel.style = textStyle;
    lifeLabel.x = 5;
    lifeLabel.y = 5;
    gameScene.addChild(lifeLabel);
    decreaseLifeBy(0);

    //set up `gameOverScene`
    //make game over text
    let gameOverText = new PIXI.Text("Game Over!");
    textStyle = new PIXI.TextStyle({
	    fill: 0x00FFFF,
	    fontSize: 60,
	    fontFamily: "Faster One",
	    stroke: 0x00000,
	    strokeThickness: 6
    });
    gameOverText.style = textStyle;
    gameOverText.x = 150;
    gameOverText.y = sceneHeight/2 - 160;
    gameOverScene.addChild(gameOverText);

    // 3B - make "play again?" button
    let playAgainButton = new PIXI.Text("Play Again?");
    playAgainButton.style = buttonStyle;
    playAgainButton.x = 250;
    playAgainButton.y = sceneHeight - 150;
    playAgainButton.interactive = true;
    playAgainButton.buttonMode = true;
    playAgainButton.on("pointerup",startGame); // startGame is a function reference
    playAgainButton.on('pointerover',e=>e.target.alpha = 0.7); // concise arrow function with no brackets
    playAgainButton.on('pointerout',e=>e.currentTarget.alpha = 1.0); // ditto
    gameOverScene.addChild(playAgainButton);

    gameOverScoreLabel = new PIXI.Text();
    gameOverScoreLabel.style = textStyle;
    gameOverScoreLabel.x = 30;
    gameOverScoreLabel.y = sceneHeight/2 - 80;
    gameOverScene.addChild(gameOverScoreLabel);

    highScoreLabel = new PIXI.Text();
    highScoreLabel.style = textStyle;
    highScoreLabel.x = 30;
    highScoreLabel.y = sceneHeight/2 - 10;
    gameOverScene.addChild(highScoreLabel);

    starthighScoreLabel = new PIXI.Text();
    starthighScoreLabel.style = textStyle;
    starthighScoreLabel.x = 30;
    starthighScoreLabel.y = sceneHeight/2 + 100;
    if(storedScore == null){
        starthighScoreLabel.text = `No high score yet`
    }
    else{
        starthighScoreLabel.text = `Your high score:  ${storedScore}`
      
    }
    startScene.addChild(starthighScoreLabel);
 
}


function increasesScoreBy(value){
    score += value;
    scoreLabel.text=`Score: ${score}`;
}

function decreaseLifeBy(value){
    life -= value;
    life = parseInt(life);
    lifeLabel.text=`Life: ${life}`;
}

//for power ups
function increaseLifeBy(value){
    life += value;
    life = parseInt(life);
    lifeLabel.text=`Life: ${life}`;
}


function gameLoop(){
    if (paused) return; 
    
	//Calculate "delta time"
	let dt = 1/app.ticker.FPS;
    if (dt > 1/12) dt=1/12;

	// Move Ship
    let mousePosition = app.renderer.plugins.interaction.mouse.global;
    
    //ship.position = mousePosition;
    let amt = 6 * dt;
    
    let newX = lerp(ship.x, mousePosition.x, amt);
    let newY = lerp(ship.y, mousePosition.y, amt);

    let w2 = ship.width/2;
    let h2 = ship.height/2;
    ship.x = clamp(newX,0+w2,sceneWidth - w2);
    ship.y = clamp(newY,0+h2,sceneHeight-h2);

    //move clouds and enemies     
    for (let cloud of clouds){
        cloud.move(dt);
        if (cloud.y > 650) {
            cloud.isAlive = false;
            gameScene.removeChild(cloud);
            cloud.destroy();
        }
    }

    for (let enemy of enemies){
        enemy.move(dt);
        if (enemy.y > 650) {
            enemy.isAlive = false;
            gameScene.removeChild(enemy);
            enemy.destroy();
            
        }
    }

    //Move power ups
    if(powerUps!= undefined){
        for(let p of powerUps){
            p.move(dt);
            if(p.x<=p.radius || p.x >=sceneWidth-p.radius){
            p.reflectX();
            p.move(dt);
            }
            if(p.y <= p.radius || p.y >= sceneHeight - p.radius){
            p.reflectY();
            p.move(dt);
        }
    }   
    }

	//Move Bullets
	for (let b of bullets){
		b.move(dt);
    }
    
    for(let b of enemyBullets){
		b.move(dt);
    }
  
	//Check for Collisions
    for(let p of powerUps){
        if(p.isAlive && rectsIntersect(p,ship)){
            powerUpSound.play();
          if(p == health){
            gameScene.removeChild(p);
            p.isAlive = false;
            increaseLifeBy(40);
           
          }
          else if(p==rage){
           
              for(let e of enemies){
                gameScene.removeChild(p);          
                p.isAlive = false;
                createExplosion(e.x,e.y,96,96);
                fireballSound.play();
                gameScene.removeChild(e);
                e.isAlive = false;              
                increasesScoreBy(1);
              }
          }       
        }
      
    }

    for(let b of bullets){
        for(let p of powerUps){
            if(rectsIntersect(p,b)){
                gameScene.removeChild(p);
                p.isAlive = false;
                increaseLifeBy(50);
                createExplosion(p.x,p.y,96,96)
            }
        }
    }

    for(let e of enemyBullets){
        if(e.isAlive && rectsIntersect(e,ship)){
            hitSound.play();
            gameScene.removeChild(e);
            e.isAlive = false;
            decreaseLifeBy(15);
        
        }
    }

    for (let e of enemies){
        for(let b of bullets){
            if(e.isAlive && rectsIntersect(e,b)){
                fireballSound.play();
                createExplosion(e.x,e.y,96,96);
                gameScene.removeChild(e);
                e.isAlive = false;
                gameScene.removeChild(b);
                b.isAlive = false;
                increasesScoreBy(5);
            }
        }
        if(e.isAlive && rectsIntersect(e,ship)){
            fireballSound.play();
            gameScene.removeChild(e);
            e.isAlive = false;
            decreaseLifeBy(10);
            createExplosion(e.x,e.y,96,96);
        }
 
    }


	//clean up
	clouds = clouds.filter(cl=>cl.isAlive);
    bullets = bullets.filter(b=>b.isAlive);
    powerUps = powerUps.filter(p=>p.isAlive);
    enemies = enemies.filter(e=>e.isAlive);
    explosions = explosions.filter(e=>e.playing);

	//Is game over?
	if (life <= 0){
        end();
        return; // return here so we skip #8 below
    }
	
    //Load next level
    if (powerUps.length == 0){
        levelNum ++;
        loadLevel();
    }
}

//create power ups
function createPowerUps(){
if(powerUps.length < 1 ){
        health = new PowerUp(12,0x7CFC00);
        health.x = Math.random() * (sceneWidth - 50)+25;
        health.y = Math.random() * (sceneHeight - 400)+25;
        gameScene.addChild(health);
        powerUps.push(health);

        rage = new PowerUp(12,0xFF0000);
        rage.x = Math.random() * (sceneWidth - 50)+25;
        rage.y = Math.random() * (sceneHeight - 400)+25;
        gameScene.addChild(rage);
        powerUps.push(rage);
}
}

//unpause to load level
function loadLevel(){

    paused = false;

}

//end game
function end(){
  
    paused = true;

    //clear arrays
    clouds.forEach(cloud=>gameScene.removeChild(cloud));
    clouds=[];

    powerUps.forEach(p=>gameScene.removeChild(p));
    powerUps=[];

    bullets.forEach(b=>gameScene.removeChild(b));
    bullets=[];

    explosions.forEach(e=>gameScene.removeChild(e));
    explosions=[];

    enemies.forEach(e=>gameScene.removeChild(e));
    enemies=[];

    enemyBullets.forEach(e=>gameScene.removeChild(e));
    enemyBullets=[];

    //end game labels
    gameOverScoreLabel.text = `Your final score:  ${score}`;
    if(storedScore > score){
        highScoreLabel.text = `Your high score:  ${storedScore}`;
    }
    else if(score > storedScore){
        highScoreLabel.text = `Your high score:  ${score}`;
        localStorage.setItem(scoreKey, score);
        storedScore = score;
        globalVariable.score = score;
    }
    else if(score = storedScore){
        highScoreLabel.text = `Your high score:  ${score}`
        localStorage.setItem(scoreKey, score);
    }
    else{
        highScoreLabel.text = `No high score yet`;
    }


    gameOverScene.visible = true;
    gameScene.visible = false;

    
}

//bullets
function fireBullet(e){
    if(levelNum == 2){
        let a = new Bullet(0xFFFFFF, ship.x+10,ship.y);
        let b = new Bullet(0xFFFFFF, ship.x,ship.y);
        let c = new Bullet(0xFFFFFF, ship.x-10,ship.y);
        bullets.push(a);
        bullets.push(b);
        bullets.push(c);
        gameScene.addChild(a);
        gameScene.addChild(b);
        gameScene.addChild(c);
        shootSound.play();
    }

    if(paused) return;
    else{
    let b = new Bullet(0xFFFFFF, ship.x,ship.y);
    bullets.push(b);
    gameScene.addChild(b);
    shootSound.play();
}
}

//explosion
function loadSpriteSheet(){
    let spriteSheet = PIXI.BaseTexture.fromImage("/explosions.png");
    let width = 96;
    let height = 96;
    let numFrames = 12;
    let textures = [];

    for(let i=0; i < numFrames; i++){
        let frame = new PIXI.Texture(spriteSheet, new PIXI.Rectangle(i*width,0,width,height));
        textures.push(frame);
    }
    return textures;
}

function createExplosion(x,y,frameWidth,frameHeight){
    let w2 = frameWidth/2;
    let h2 = frameHeight/2;
    let expl = new PIXI.extras.AnimatedSprite(explosionTextures);
    expl.x = x-w2;
    expl.y = y-h2;
    expl.animationSpeed = 1/7;
    expl.loop= false;
    expl.onComplete= e=> gameScene.removeChild(expl);
    explosions.push(expl);
    gameScene.addChild(expl);
    expl.play();
}
