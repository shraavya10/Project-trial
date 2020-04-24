var PLAY=1;
var END=0;
var SERVE=2;
//var astronaut;
var gameState=SERVE;
var asteroids,fireball,backGround,oxygenPellet,oxyPellet,house;
var ground;
var astro;
var asteroidGroup,fireballGroup;
var powerPelletGroup;
var oxygenPelletGroup;
var groundGroup;
var oxyGroup;
var foodHouseGroup;
var obstacle1,astronautImg,powerImg,oxygenImg,hungryAstro;
var backgroundImg;
var oxygenLevel=10;
var gameOver,restart;
var overImg,restartImg;
var power;
var oxyImg
var introSong,gameOverSong,fireSong,powerUpSong,hungrySong;

function preload(){
  
  sequenceAnimation = loadAnimation('images/walking1.png', 'images/walking2.png', 
  'images/walking3.png', 'images/walking4.png', 
  'images/walking5.png', 'images/walking6.png');  

obstacle1=loadImage("images/asteroid1.jpg");
obstacle2=loadImage("images/fireasteroid.png");
//astronautImg=loadImage("images/astro_nobg.png");
powerImg=loadImage("images/power.png");
oxygenImg=loadImage("images/oxygen.png");
backgroundImg=loadImage("images/space.jpg");
overImg=loadImage("images/gameOver.jpg");
restartImg=loadImage("images/resetbutton.png");
introSong=loadSound("sound/introsong.mp3");
gameOverSong=loadSound("sound/gameover.mp3");
fireSong=loadSound("sound/asteroid.mp3");
powerUpSong=loadSound("sound/powerup.mp3");
oxyImg=loadImage("images/oxygen.png");
//foodImg=loadImage("images/restaurant.jpg");
hungryAstro=loadImage("images/hungryastro.png");
hungrySong=loadSound("sound/hungry.mp3");
}
function setup() {
  createCanvas(1200,400);
      backGround=createSprite(600,200,1200,400);
 backGround.addImage("space",backgroundImg);
 backGround.x=backGround.width/2;
  astronaut=createSprite(50,350,20,80);
  astronaut.scale =  .5;
  astronaut.mirrorX(-1);
  //astronaut.debug = true;
  //add the animation to the sprite
  astronaut.addAnimation('walker', sequenceAnimation);
 
 astronaut.setCollider("circle",0,0,65);
  ground=createSprite(400,380,800,20);
  ground.visible=false;
  gameOver=createSprite(400,200,30,40);
  gameOver.addImage("over",overImg);
  restart=createSprite(550,200,40,30);
  restart.addImage("restart",restartImg);
  gameOver.visible=false;
  restart.visible=false;
 
 asteroidGroup=new Group();
 fireballGroup=new Group();
powerPelletGroup=new Group();
oxygenPelletGroup=new Group();
groundGroup=new Group();
oxyGroup=new Group();
foodHouseGroup=new Group();

}


function draw() 
{

  background("black"); 

 
  
 if(keyCode===13){
      gameState=PLAY;
 }
 
if(gameState===PLAY){
  backGround.velocityX=-4;
  
 /* for(var j=0;j<oxygenPelletGroup.length;j++){
    if(oxygenPelletGroup.get(j).position.y<200){
      spawnPowerPellet();
      spawnGround();
    }
  }*/
  if (backGround.x < 400){
    backGround.x = backGround.width/2;
  }
  Astronaut();
 spawnAsteroids1(); 
 spawnAsteroids2(); 
spawnPowerPellet(); 
spawnOxygenPellet();
spawnGround();
spawnOxy();
spawnFood();

if(oxygenPelletGroup.isTouching(astronaut)){

powerUpSong.play();
oxygenPelletGroup.destroyEach();
oxygenLevel=oxygenLevel+2; 

  
}
if(oxyGroup.isTouching(astronaut)){

  powerUpSong.play();
  oxyGroup.destroyEach();
  oxygenLevel=oxygenLevel+1; 
  
    
  }
 else if(asteroidGroup.isTouching(astronaut)){

asteroidGroup.destroyEach();
oxygenLevel=oxygenLevel-1;



}
else if(fireballGroup.isTouching(astronaut)){
  
  fireSong.play();
  fireballGroup.destroyEach();
  oxygenLevel=oxygenLevel-1;
  
  
  }
  if(foodHouseGroup.isTouching(astronaut)){
        hungrySong.play();
       foodHouseGroup.destroyEach();
    
       
  }
 
  if(powerPelletGroup.isTouching(astronaut)){
    powerPelletGroup.destroyEach();
    if(keyDown("space") && astronaut.y>=334){
    astronaut.velocityY=-15;
       
       }
         astronaut.velocityY=astronaut.velocityY+0.3;
  }
 
  if(oxygenLevel===0){
    gameOverSong.play();
    gameState=END;
    
  }



}
 if(gameState === END) {
 
    //stopnthe movement of all groups and make them atay on the screen
  gameOver.visible = true;
  restart.visible = true;
  
  //set velcity of each game object to 0
  backGround.velocityX=0;
  ground.velocityX = 0;
  astronaut.velocityY = 0;
  asteroidGroup.setVelocityXEach(0);
  fireballGroup.setVelocityXEach(0);
  powerPelletGroup.setVelocityXEach(0);
  oxygenPelletGroup.setVelocityXEach(0);
  groundGroup.setVelocityXEach(0);
  oxyGroup.setVelocityXEach(0);
  foodHouseGroup.setVelocityXEach(0);
  
 
  //set lifetime of the game objects so that they are never destroyed
  asteroidGroup.setLifetimeEach(-1);
  fireballGroup.setLifetimeEach(-1);
  powerPelletGroup.setLifetimeEach(-1);
  oxygenPelletGroup.setLifetimeEach(-1);
  groundGroup.setLifetimeEach(-1);
  oxyGroup.setLifetimeEach(-1);
  foodHouseGroup.setLifetimeEach(-1);


  
  if(mousePressedOver(restart)) {
    gameOverSong.stop();
    //introSong.stop();
    reset();
  }
}
  drawSprites();
  if(gameState==SERVE){
    
    //introSong.play();
    textSize(28);
    textFont('Britannic Bold');
    fill("White");
    text("GALACTIC SPACE RANGERS!", 350,160);
     textSize(20);
    text("Use space bar to Jump and escape from the asteroids",350,200);
    text("Collect the power pellets and oxygen while you travel through space!!",350,240);
    text("Happy travelling!! ",350,280);
    text("Press ENTER to Start!!",450,320);

}
if(gameState==PLAY){
 // introSong.stop();
  textSize(28);
  fill("white");
  text("Oxygen Level : "+oxygenLevel,900,100);
}
if(gameState==END){
    textSize(22);
    textFont('Britannic Bold');
    fill("White");
    text("Thanks For playing!!", 300,140);
    text("Game developed by : P Shraavya Hande",300,360);
}
}

function Astronaut(){

  if(keyDown("space") && astronaut.y>=334){
    astronaut.velocityY=-12;
    
    }
      astronaut.velocityY=astronaut.velocityY+0.5;
      //console.log(astronaut.velocityY);
      astronaut.collide(ground);
   
   


}

function spawnAsteroids1(){
 
    if(frameCount % 120 === 0) {
       asteroids = createSprite(1200,380,40,10);
       asteroids.setCollider("circle",0,0,40);
      // asteroids.debug=true;
      asteroids.y=random(100,400)
      asteroids.velocityX = -(7+Math.round(getFrameRate()/25));
       asteroids.addImage("asteroid1",obstacle1);
              
      //assign scale and lifetime to the obstacle           
      asteroids.scale = 0.5;
      asteroids.lifetime = 300;
      //add each obstacle to the group
      asteroidGroup.add(asteroids);
    }
  }
  function spawnAsteroids2(){
 
    if(frameCount % 280 === 0) {
       fireball = createSprite(1200,380,40,10);
       fireball.setCollider("circle",0,0,40);
     //  fireball.debug=true;
      fireball.y=random(100,400)
      fireball.velocityX = -(7+Math.round(getFrameRate()/25));
      fireball.addImage("asteroid2",obstacle2);
            
      //assign scale and lifetime to the obstacle           
      fireball.scale = 0.5;
      fireball.lifetime = 300;
      //add each obstacle to the group
      fireballGroup.add(fireball);
    }
  }
  
  function spawnPowerPellet(){
 
    if(frameCount % 798 === 0 ) {
      var powerPellet = createSprite(1200,380,40,10);
      powerPellet.y=random(280,380)
      powerPellet.velocityX = -6;
     powerPellet.addImage("power",powerImg);
    
      
      //assign scale and lifetime to the obstacle           
      powerPellet.scale = 0.5;
      powerPellet.lifetime = 300;
      //add each obstacle to the group
      powerPelletGroup.add(powerPellet);
    }
  }
  
  function spawnOxygenPellet(){
 
    if(frameCount % 800 === 0) {
       oxygenPellet = createSprite(1200,380,40,10);
      oxygenPellet.y=random(170,220)

      oxygenPellet.velocityX = -6;
     oxygenPellet.addImage("oxygen",oxygenImg);
    
      //assign scale and lifetime to the obstacle           
      oxygenPellet.scale = 0.5;
      oxygenPellet.lifetime = 300;
      //add each obstacle to the group
      oxygenPelletGroup.add(oxygenPellet);
    }
  }

  function spawnOxy(){
 
    if(frameCount % 2500 === 0) {
      oxyPellet = createSprite(1200,380,40,10);
      oxyPellet.y=random(280,360);

      oxyPellet.velocityX = -6;
     oxyPellet.addImage("oxygen",oxyImg);
   
      //assign scale and lifetime to the obstacle           
      oxyPellet.scale = 0.5;
      oxyPellet.lifetime = 300;
      //add each obstacle to the group
      oxyGroup.add(oxyPellet);
    }
  }

  function spawnGround(){
 
    if(frameCount % 800 === 0 ) {
      var miniatureGro = createSprite(1200,380,200,20);
      miniatureGro.y=random(180,220)
      miniatureGro. velocityX = -6;
      console.log(miniatureGro.x);
    
      //assign scale and lifetime to the obstacle           
      miniatureGro.scale = 0.5;
      miniatureGro.lifetime = 300;
      //add each obstacle to the group
      
    
      groundGroup.add(miniatureGro);
     
    }

  }
  function spawnFood(){
 
    if(frameCount % 3000 === 0) {
       house = createSprite(1200,320,40,10);
    

      house.velocityX = -6;
     house.addImage("house",hungryAstro);
          
      //assign scale and lifetime to the obstacle           
     // house.scale = 0.5;
      house.lifetime = 600;
      //add each obstacle to the group
      foodHouseGroup.add(house);
    }
  }

  function reset(){
    gameState = SERVE;
   //reset the game and destroy the groups
    gameOver.visible = false;
    restart.visible = false;
    astronaut.x=50;
    astronaut.y=350;
    asteroidGroup.destroyEach();
    fireballGroup.destroyEach();
    powerPelletGroup.destroyEach();
    oxygenPelletGroup.destroyEach();
    groundGroup.destroyEach();
    oxyGroup.destroyEach();
    foodHouseGroup.destroyEach();
    
      oxygenLevel = 10;
   // asteroidGroup.setVelocityXEach= -(4+Math.round(frameCount/250));
  // fireballGroup.setVelocityXEach=-(4+Math.round(frameCount/270));
  }
 