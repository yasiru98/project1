class Ship extends PIXI.Sprite{
    constructor(x=0,y=0){
        super(PIXI.loader.resources["/spaceship.png"].texture);
        this.anchor.set(.5,.5);
        this.scale.set(0.9);
        this.rotation = -Math.PI/2;
        this.x = x;
        this.y = y;

    }
}

//power ups class
class PowerUp extends PIXI.Graphics{
constructor(radius, color=0xFF0000,x=0,y=0){
    super();
    this.beginFill(color);
    this.drawCircle(0,0,radius);
    this.endFill();

    this.x = x;
    this.y=y;
    this.radius = radius;

    this.fwd = getRandomUnitVector();
    this.speed = 50;
    this.isAlive= true;
}

move(dt=1/60){
    this.x += this.fwd.x * this.speed * dt;
    this.y += this.fwd.y * this.speed *dt;
}

reflectX(){
    this.fwd.x *= -1;
}

reflectY(){
    this.fwd.y *= -1;
}
}

class Bullet extends PIXI.Graphics{
    constructor(color=0xFFFFFF, x=0,y=0){
        super();
        this.beginFill(color);
        this.drawRect(-2,-3,4,6);
        this.endFill();
        this.x = x;
        this.y =y;
        //variables
        this.fwd = {x:0,y:-1};
        this.speed = 400;
        this.isAlive = true;
        Object.seal(this);
    }

    move(dt=1/60){
        this.x += this.fwd.x * this.speed * dt;
        this.y += this.fwd.y * this.speed * dt;
    }
}

class EnemyBullet extends PIXI.Graphics{
    constructor(color=0xFF0000, x=0,y=0){
        super();
        this.beginFill(color);
        this.drawRect(-2,-3,4,6);
        this.endFill();
        this.x = x;
        this.y =y;
        //variables
        this.fwd = {x:0,y:1};
        this.speed = 400;
        this.isAlive = true;
        Object.seal(this);
    }

    move(dt=1/60){
        this.x += this.fwd.x * this.speed * dt;
        this.y += this.fwd.y * this.speed * dt;
    }
}


class Cloud extends PIXI.Sprite{
    constructor(x,y=-100){
        const sprite = (Math.random() > 0.5 ? "cloud1" : "cloud2");
        super(PIXI.loader.resources["/"+sprite+".png"].texture);
        this.anchor.set(.5,.5);
        let minScale = 0.2;
        let maxScale = 0.5;
        let scale = Math.random() * (maxScale - minScale) + minScale;
        this.scale.set(scale);
        this.fwd = {x:0,y:1};
        this.speed = 100;
        this.x = x;
        this.y = y;
        this.isAlive = true;
   
    }
    move(dt=1/60){
        this.x += this.fwd.x * this.speed * dt;
        this.y += this.fwd.y * this.speed * dt;
     
    }
}


class Enemy extends PIXI.Sprite{
    constructor(x,y=-100){
       
        super(PIXI.loader.resources["/enemy.png"].texture);
        this.anchor.set(.5,.5);
        this.scale.set(0.3);
        this.rotation = -Math.PI/2;
        this.fwd = {x:0,y:1};
        this.speed = 200;
        this.x = x;
        this.y = y;
        this.isAlive = true;
 
    }
    move(dt=1/60){
        this.x += this.fwd.x * this.speed * dt;
        this.y += this.fwd.y * this.speed * dt;
     
    }
}