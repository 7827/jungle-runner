var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boy,boy_running,boy_collided,boy_jump;
var ground, invisibleGround, groundImage;

//var safehouse,safehouseImg;
var obstaclesGroup, obstacle1, obstacle2//,obstacle1Img,obstacle2Img;

var score=0;

var gameOver, restart,gameOverImg,restartImg;

var jungle;

function preload(){
  boy_running =   loadAnimation("./boy/Run1.png","./boy/Run2.png","./boy/Run3.png",
  "./boy/Run4.png","./boy/Run5.png","./boy/Run6.png","./boy/Run7.png",
  "./boy/Run8.png","./boy/Run9.png","./boy/Run10.png","./boy/Run11.png",
  "./boy/Run12.png","./boy/Run13.png","./boy/Run14.png","./boy/Run15.png",)
  groundImage = loadImage("ground2.png");
  boy_collided = loadAnimation("./boy/Dead1.png","./boy/Dead2.png","./boy/Dead3.png",
  "./boy/Dead4.png","./boy/Dead5.png","./boy/Dead6.png","./boy/Dead7.png",
  "./boy/Dead8.png","./boy/Dead9.png","./boy/Dead10.png","./boy/Dead11.png",
  "./boy/Dead12.png","./boy/Dead13.png","./boy/Dead14.png","./boy/Dead15.png");
  boy_jump= loadAnimation("./boy/Jump1.png","./boy/Jump2.png","./boy/Jump3.png",
  "./boy/Jump4.png","./boy/Jump5.png","./boy/Jump6.png","./boy/Jump7.png",
  "./boy/Jump8.png","./boy/Jump9.png","./boy/Jump10.png","./boy/Jump11.png",
  "./boy/Jump12.png","./boy/Jump13.png","./boy/Jump14.png","./boy/Jump15.png",)
  
 // safehouseImg=loadImage("./safehouse/safehouse.png")
  groundImage = loadImage("ground2.png");
  
  jungle=loadImage("./jungle/jungle.jpg")
  
  obstacle1 = loadImage("./obstacles/obstacle1.png");
  obstacle2= loadImage("./obstacles/obstacle2.png");
 
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  
  
}

function setup() {
  createCanvas(600, 200);
  
  boy = createSprite(50,180,20,50);
  
  boy.addAnimation("running", boy_running);
  boy.addAnimation("collided",boy_collided);
  boy.scale = 0.1;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  
 obstaclesGroup=new Group();
  
  score = 0;
}

function draw() {
  //boy.debug = true;
  background(jungle);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    //change the boy animation
    boy.changeAnimation("running", boy_running);
    
    //if(keyDown("space")) {
      //boy_jump
    //}
    if(keyDown("space")) {
      boy.velocityY = -12;
      
    }
    boy.velocityY = boy.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    boy.collide(invisibleGround);
   
  
    if(obstaclesGroup.isTouching(boy)){
        gameState = END;
     
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    boy.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
   
    
    //change the trex animation
    boy.changeAnimation("collided",boy_collided);
    
    //set lifetime of the game objects so that they are never destroyed
 // obstaclesGroup.setLifetimeEach(-3);
    obstaclesGroup.destroyEach()
    
    
  }
  if(mousePressedOver(restart)&&gameState===END)
  { 
    reset();
  }
  spawnObstacles();
  drawSprites();
}

function reset()
{
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  obstaclesGroup.destroyEach();
  
  score=0;
}





function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    //obstacle.debug = true;
   
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage("obstacle",obstacle1);
              break;
      case 2: obstacle.addImage("obstacle",obstacle2);
              break;
     
              
      default: break;
    }
    obstacle.velocityX = -(6 + 3*score/100);
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

