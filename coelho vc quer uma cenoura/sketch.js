const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var corda;
var melao; 
var melao_corda;
var backgroundIMG;
var melaoImage;
var coelho;
var coelho_nao_IMG;
let engine;
let world;
var butao;
var ground;
var blink;
var papinha;
var triste;
function preload(){
  backgroundIMG=loadImage("background.png");
  melaoImage=loadImage("melon.png");
  mute=loadImage("mute.png");
  coelho=loadImage("Rabbit-01.png");
  blink=loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  papinha=loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  triste=loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  blink.playing=true;
  papinha.playing=true;
  papinha.looping=false;
  triste.playing=true;
  triste.looping=false;
}
function setup() 
{
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;
  corda=new Rope(6,{x:245,y:25});
  ground = new Ground(200,690,600,20);
  var melao_options={
    density:0.001
  }
  melao=Bodies.circle(260,40,15,melao_options);
  Matter.Composite.add(corda.body,melao);
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);
  imageMode(CENTER);
  melao_corda=new Link(corda,melao);
 
  butao=createImg("cut_button.png");
  butao.position(220,30);
  butao.size(50,50);
  butao.mouseClicked(a_morte_de_newton);
  blink.frameDelay=15;
  papinha.frameDelay=15;
  triste.frameDelay=15;
  coelho_nao_IMG=createSprite(250,640,100,100);
  coelho_nao_IMG.addAnimation("piscando",blink);
  coelho_nao_IMG.addAnimation("hora do almoço",papinha);
  coelho_nao_IMG.addAnimation("mo fome",triste);
  coelho_nao_IMG.changeAnimation("piscando");
  
  coelho_nao_IMG.scale=0.2;
}

function draw() 
{
  image(backgroundIMG,width/2,height/2,500,700);
  corda.show();
  Engine.update(engine);
  
  if(melao!==null ){
    image(melaoImage,melao.position.x,melao.position.y,60,60);
  }
  
  drawSprites();
  
  if(colisao(melao,coelho_nao_IMG)){
    coelho_nao_IMG.changeAnimation("hora do almoço");
  }
  
  else if(colisao(melao,ground.body)){
    coelho_nao_IMG.changeAnimation("mo fome");
  }
  
}
function a_morte_de_newton(){
  corda.break();
  melao_corda.dettach();
  melao_corda=null;
}

function colisao(body,sprite){
  if(body!==null){
    var alguma_coisa=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if(alguma_coisa<=81){
      World.remove(engine.world,body);
      body=null;
      return true;
    }
    else{
      return false;
    }
  }
}




