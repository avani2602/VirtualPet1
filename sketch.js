var dog, dogImg, happyDog, happyDogImg;
var database;
var food, foodStock;
var bgImg;

function preload()
{
  bgImg = loadImage("images/garden.png");
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png")
}

function setup() {

  database = firebase.database();

  createCanvas(500, 500);
  
  dog = createSprite(250,400,20,40);
  dog.scale = 0.2;
  dog.addImage("normal", dogImg);

  foodStock = database.ref("Food");
  foodStock.on("value",readStock,showError);
  
}


function draw() {  

  background(bgImg);
  drawSprites();
  textSize(20);
  fill("black");
  stroke("green");
  text("Remaining Food: " + food, 170, 50);

  if(keyDown(UP_ARROW)){
    writeStock(food);
    dog.addImage(happyDogImg)
  }

  if(keyWentUp(UP_ARROW)){

    dog.addImage(dogImg);
  }


}

function readStock(data){
  food = data.val();
}

function showError(){
  console.log("error");
}

function writeStock(x){
  database.ref('/').update({
    Food:x - 1
  })
}




