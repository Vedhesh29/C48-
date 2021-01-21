var bg, bgImg; 
var virus; 
var virus1, virus2, virus3; 
var virusG; 
var antivirus, antivirusImg; 
var rand1, rand2; 
var bullet; 
var gameState = "START"; 
var Depth;
var BulletG;
var computer;
var comp1Img, comp2Img;
var q = 4;
var restart; 
var button;
var n = 0; 


function preload(){
    bgImg = loadImage("binary code img.jpg");
    virus1 = loadImage("virus.png");
    virus2 = loadImage("virus 2.png");
    virus3 = loadImage("virus 3.png"); 
    antivirusImg = loadImage("antivirus.png"); 
    comp1Img = loadImage("infected comp.png");
    comp2Img = loadImage("crying comp.png"); 

}


function setup(){
    createCanvas(1200,800); 
    bg = createSprite(600,400,10,10);
    bg.addImage("background", bgImg); 
    bg.scale = 0.75;
    bg.velocityX = -3; 
    
    antivirus = createSprite(600, 600, 10,10); 
    antivirus.addImage("anti", antivirusImg); 
    antivirus.scale = 0.5; 
    Depth=antivirus.depth;

    computer = createSprite(600,600,10,10);
    computer.addImage("comp", comp1Img);
    computer.scale = 1
     
  
    computer.depth = Depth-1; 

    if(n === 1){
        button = createSprite(450,500);
        button.depth = bg.depth+2;
    }
    

 
    virusG = new Group();
    BulletG = new Group(); 
}

function draw(){

    if(gameState === "START"){
        background(0);
        textSize(20);
        textFont("STENCIL");
        fill("green");
        text("The computer has been affected by a virus", 350,400);
        text("Help the anti-virus kill the viruses and save the computer! Press Space to Begin.", 130,500); 
        
    }
    if (bg.x<500){
        bg.x=600; 
    }

    if(gameState === "START" && keyDown("space")){
    gameState = "PLAY";  
    }
if(gameState==="PLAY"){

    spawnVirus(); 
    Bullet();

    if(virusG.isTouching(BulletG)){
        virusG.destroyEach(); 
        BulletG.destroyEach();
    }

    if(frameCount > 100){
        gameState= "WON";
   }

   if(virusG.isTouching(antivirus)){
       gameState="LOST";
   }
    

drawSprites();
}
 if(gameState === "WON"){
     background("black");
     textSize(23);
     textFont("STENCIL");
     fill("white");
     text("YOUR COMPUTER IS SAVED FROM THE VIRUS!!",400,400); 
     text("PRESS 'H' TO PLAY LEVEL HARD", 450,450);  
     n = 1; 
     
 }

 if(gameState === "WON" && keyDown("h")){
    gameState = "HARD";

 }

 if (gameState === "HARD"){
    q= q * (2); 
 }

 if(gameState === "LOST"){
    background("black");
     textSize(30);
     textFont("STENCIL");
     fill("red");
     text("YOUR COMPUTER HAS BEEN INFECTED WITH THE VIRUS :(",200,400); 
 }

}

function spawnVirus(){
    if(frameCount<= 100){
        if(frameCount%100===0){            
            //rand1 is for position of virus 
            rand1 = Math.round(random(1,3)); 
            //rand2 is for image of virus 
            rand2 = Math.round(random(1,3));
      
          if(rand1 === 1){
              virus = createSprite(10,600,20,20);
              virus.velocityX = q;  
          }
      
          if(rand1 === 2){
              virus = createSprite(1100,600,20,20);
              virus.velocityX = (-1) * q;  
      
          }
      
          if(rand1 === 3){
              virus = createSprite(600,10,20,20);
              virus.velocityY = q; 
          }
      
          
      
          if(rand2 === 1){
              virus.addImage(virus1);
              virus.scale = 0.4;
          }
      
          if(rand2 === 2){
              virus.addImage(virus2);
          }
      
          if(rand2 === 3){
              virus.addImage(virus3); 
          }
      
      
          virus.lifetime = 300;
          virus.depth=Depth;
          virusG.add(virus); 
          antivirus.depth=antivirus.depth+1;
      
          }
    }
 
}
function Bullet(){
    if (keyDown(UP_ARROW)){
        bullet = createSprite(600,550,10,10); 
        bullet.shapeColor = "red"; 
        bullet.velocityY = -2; 
        BulletG.add(bullet);     
    }

    if (keyDown(RIGHT_ARROW)){
        bullet = createSprite(650,600,10,10); 
        bullet.shapeColor = "red"; 
        bullet.velocityX = 2; 
        BulletG.add(bullet);
    }

    if (keyDown(LEFT_ARROW)){
        bullet = createSprite(550,600,10,10); 
        bullet.shapeColor = "red"; 
        bullet.velocityX = -2; 
        BulletG.add(bullet);
    }

    if (keyDown(LEFT_ARROW) && keyDown(UP_ARROW)){
        bullet = createSprite(550,600,10,10); 
        bullet.shapeColor = "red"; 
        bullet.velocityX = -2; 
        bullet.velocityY = -2;
        BulletG.add(bullet);
    }

    if (keyDown(RIGHT_ARROW) && keyDown(UP_ARROW)){
        bullet = createSprite(650,600,10,10); 
        bullet.shapeColor = "red"; 
        bullet.velocityX = 2; 
        bullet.velocityY = -2;
        BulletG.add(bullet);
    }

    


}