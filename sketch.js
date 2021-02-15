var canvas, backgroundImage;
var astronaut,astronautImg,astronaut2,astronaut2Img;
var bg
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5;
var bullet,bulletImg,bullet2,bullet2Img;
var gameOver,gameOverImg;
var gameState=0;
var asteroidsGroup;
var score=0;
var life1=3;
var life2=3;
var form;
var blast,blastImg;
var player1name,player2name;
var Shootingsound1,Shootingsound2,ExplodingSound;
var score1=0,score2=0;
var bg1,bg2;

function preload(){
astronautImg=loadImage("Images/Astronaut.png");
astronaut2Img=loadImage("Images/astronaut_new.png")
backgroundImage=loadImage("Images/Background.jpg");
obstacle1=loadImage("Images/Alien_1-removebg-preview.png")
obstacle2=loadImage("Images/Alien_2-removebg-preview.png")
obstacle3=loadImage("Images/Alien_3.png")
obstacle4=loadImage("Images/Asteroid.png");
obstacle5=loadImage("Images/Asteroid_2.png");
bulletImg=loadImage("Images/Fireball.png");
bullet2Img=loadImage("Images/fireball-2.png");
gameOverImg=loadImage("Images/game over.png");
blastImg=loadImage("Images/boom.png");
introBG=loadImage("Images/bg1.jpg");
Shootingsound1=loadSound("Images/gun1.mp3");
Shootingsound2=loadSound("Images/gun2.mp3");
bg1=loadImage("Images/Background1.jpg")
bg2=loadImage("Images/bg1.jpg")
ExplodingSound=loadSound("Images/Explosion+1.wav");
}

function setup(){
        
  createCanvas(1200,750);
  bg=createSprite(600,300,1400,20);
bg.addImage(backgroundImage);
bg.velocityX=-2;
createAstronaut();
createAstronaut2();


obstaclesGroup=new Group();
asteroidsGroup=new Group();
bulletGroup=new Group();
bullet2Group=new Group();

form=new Form();
form2=new Form2();
edges=createEdgeSprites();
}

function draw(){

if(gameState===0){
form.display();

}
if(gameState===1){
  form2.display();
  
  }
if(gameState===2){
  background("Black");
  
spawnAsteroids();
spawnObstacles();
if(bg.x<200){
bg.x=900;//bg.width/2;
}
if(keyDown("UP_ARROW")){
astronaut.y=astronaut.y-5;

}
if(keyDown("DOWN_ARROW")){
astronaut.y=astronaut.y+5;
}
if(keyDown("SPACE")){
Lightball();

}
if(keyDown("ENTER")){
  Lightball2();
  
  }
if(keyDown("W")){
  astronaut2.y=astronaut2.y-5;
}
if(keyDown("S")){
  astronaut2.y=astronaut2.y+5;
}

for(var i=0;i<obstaclesGroup.length;i++){
  if(obstaclesGroup.get(i).collide(astronaut)){
    obstaclesGroup.get(i).destroy();
    blast1();
    //blast.y=astronaut.y+20;
    life1=life1-1;
    astronaut.destroy();
    object=setTimeout(createAstronaut,2000);
    ExplodingSound.play();
 }
}
for(var i=0;i<asteroidsGroup.length;i++){
  if(asteroidsGroup.get(i).collide(astronaut)){
    asteroidsGroup.get(i).destroy();
    blast1();
   // blast.y=astronaut.y+20;
    life1=life1-1;
    astronaut.destroy();
    object=setTimeout(createAstronaut,2000);
    ExplodingSound.play();
  }
 }

for(var i=0;i<obstaclesGroup.length;i++){
  if(obstaclesGroup.get(i).collide(astronaut2)){
    obstaclesGroup.get(i).destroy();
    blast2();
   // blast.y=astronaut2.y+10;
    life2=life2-1;
    astronaut2.destroy();
    object=setTimeout(createAstronaut2,2000);
    ExplodingSound.play();
  
 }

}

for(var i=0;i<asteroidsGroup.length;i++){
  if(asteroidsGroup.get(i).collide(astronaut2)){
    asteroidsGroup.get(i).destroy();
    blast2();
    //blast.y=astronaut2.y+10;
    life2=life2-1;
    astronaut2.destroy();
    object=setTimeout(createAstronaut2,2000);
    ExplodingSound.play();
  
 }
}

if(life1===0 || life2===0){
  
 gameState=3;

}

for(var i=0;i<obstaclesGroup.length;i++){
  if(obstaclesGroup.get(i).isTouching(bulletGroup)){
    obstaclesGroup.get(i).destroy();
    bulletGroup.destroyEach();
    score1=score1+1;
 }
}
for(var i=0;i<obstaclesGroup.length;i++){
  if(obstaclesGroup.get(i).isTouching(bullet2Group)){
    obstaclesGroup.get(i).destroy();
    bullet2Group.destroyEach();
    score2=score2+1;
 }
}
astronaut.collide(edges[2]);
astronaut2.collide(edges[2]);
astronaut.collide(edges[3]);
astronaut2.collide(edges[3]);
drawSprites();
textSize(20);
fill("white");
textFont("Comic Sans MS");
text(player1name +"'s Score: "+ score1, 100,50);
text(player2name +"'s Score: "+ score2, 900,50);
text(player1name +"'s Life: "+ life1, 100,75);
text(player2name +"'s Life: "+ life2, 900,75);


}

if(gameState===3){
//background("green");
if(score1>score2){
  textSize(40);
  textFont("Comic Sans MS");
  fill("white");
  text("Congratulations!",490,300);
  text(player1name+" has won!",500,400);
}
if(score2>score1){
textSize(40);
textFont("Comic Sans MS");
fill("white");
text("Congratulations!",490,300);
text(player2name+" has won!",500,400);
}
if(score1===score2){
  if(life1>life2){
  textSize(40);
  textFont("Comic Sans MS");
  fill("white");
  text("Congratulations!",490,300);
  text(player1name+" has won!",500,400);
  }
  else if(life2>life1){
    textSize(40);
    textFont("Comic Sans MS");
    fill("white");
    text("Congratulations!",490,300);
    text(player2name+" has won!",500,400);
    }
    else if(life2===life1){
      textSize(50);
      textFont("Comic Sans MS");
      fill("white");
      text("It's a tie!",490,300);
      
      }
}


//gameOver=createSprite(600,300,100,100);
//gameOver.scale=0.3;
//gameOver.visible=false;
//gameOver.addImage(gameOverImg);
}
}





function spawnObstacles() {
  if(frameCount % 150 === 0) {
    var obstacle = createSprite(1200,300,10,40);
    obstacle.debug=false;
    obstacle.velocityX =-6;// (-6 + 3*score/100);
    obstacle.y=Math.round(random(100,700))
   
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      
      default: break;
    }
    
            
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
 
    obstaclesGroup.add(obstacle);
  }
}
  function spawnAsteroids() {
        if(frameCount % 100 === 0) {
          var asteroid = createSprite(1200,150,10,40);
         asteroid.debug=false;
         asteroid.setCollider("rectangle",0,0,200,200);
          asteroid.velocityX =-6;// (-6 + 3*score/100);
          asteroid.scale=0.5;
         asteroid.y=Math.round(random(100,700));
          var rand = Math.round(random(1,2));
          switch(rand) {
            case 1: asteroid.addImage(obstacle4);
                    break;
            case 2: asteroid.addImage(obstacle5);
                    break;
            default: break;
            
            
          }
          asteroidsGroup.add(asteroid);
        }
}
function Lightball(){
var bullet=createSprite(200,300,50,50);
bullet.debug=false;
bullet.scale=0.2;
bullet.addImage(bulletImg);
bullet.velocityX=5;
bullet.y=astronaut.y+20;
bulletGroup.add(bullet);
Shootingsound1.play();
}
function Lightball2(){
var bullet2=createSprite(200,300,50,50);
bullet2.scale=0.2;
bullet2.addImage(bullet2Img);
bullet2.velocityX=5;
bullet2.y=astronaut2.y-25;
bullet2Group.add(bullet2);
Shootingsound2.play();
}
function blast1(){
  var blast1=createSprite(200,astronaut.y+20,50,50);
  
  blast1.addImage(blastImg);
  blast1.lifetime=10;
}
function blast2(){
  var blast2=createSprite(200,astronaut2.y+10,50,50);
  
  blast2.addImage(blastImg);
  blast2.lifetime=10;
}
  function createAstronaut(){
    astronaut=createSprite(100,250,50,50);
astronaut.debug=false;
astronaut.addImage(astronautImg);
astronaut.scale=0.3;
  }
  function createAstronaut2(){
    astronaut2=createSprite(100,500,50,50);
astronaut2.debug=false;
astronaut2.addImage(astronaut2Img);
astronaut2.scale=0.7;
  }
