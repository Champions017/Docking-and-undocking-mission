var space,iss,issImg;
var SC,SCImg1,SCImg2,SCImg3,SCImg4;

var PLAY = 0
var END = 1
var gameState = 0

function preload(){
  space = loadImage("spacebg.jpg")

  issImg = loadImage("iss.png")
  SCImg1 = loadAnimation("spacecraft1.png");
  SCImg2 = loadAnimation("spacecraft2.png");
  SCImg3 = loadAnimation("spacecraft3.png");
  SCImg4 = loadAnimation("spacecraft4.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  SC = createSprite(width/2,height/2+200);
  SC.addAnimation("none",SCImg1)
  SC.addAnimation("both",SCImg2)
  SC.addAnimation("left",SCImg3)
  SC.addAnimation("right",SCImg4)
  SC.scale = 0.3
  iss = createSprite(width/2,height/2-100);
  iss.addImage(issImg)

  //iss.debug = true;
  iss.setCollider("circle",-70,20,17)
  //SC.debug = true;
  SC.setCollider("rectangle",0,-200,70,10)
}

function draw() {
  background(space);  
  drawSprites();

  if(gameState === PLAY){
    if(keyDown("left")){
      SC.changeAnimation("right",SCImg4);
      SC.velocityX = -3;
    }
    else if(keyDown("right")){
      SC.changeAnimation("left",SCImg3);
      SC.velocityX = 3;
    }
    else if(keyDown("up")){
      SC.changeAnimation("both",SCImg2);
      SC.velocityY = -3;
    }
    else{
      SC.velocityX = 0
      SC.velocityY = 0
      //SC.changeAnimation("none",SCImg1)
    }
    if(SC.x >= iss.x - 85 && SC.y <= iss.y + 130 && SC.x <= iss.x - 70){
      gameState = END
      console.log("docked, gameState")
    }
}
if(gameState === END){
  console.log("docked")
  fill("yellow");
  textSize(35)
  textAlign(CENTER);
  textFont("Castellar")
  text("Docking successful!",width/2,height-200)
  fill("green")
  text("Press 'r' to retry!",width/2,height-100)
  SC.velocityX = 0
  SC.velocityY = 0

  if(keyDown("r")){
    reset();
  }
}
SC.depth = SC.depth - 1
}

function reset(){
  gameState = PLAY
  SC.x = width/2;
  SC.y = height/2 + 200
}