var dog, happyDog, database, foodS, foodStock;
var dogImg, happyDogImg;

function preload()
{
	dogImg = loadImage("images/dogImg.png")
  happyDogImg = loadImage("images/dogImg1.png")
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);

  dog = createSprite(250,300,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20);
  
}


function draw() { 
  background("green") 
  if( foodS!== undefined) {
    textSize(17);
    fill(255);
    stroke("black");
    text("Food Remaning :"+foodS,170,200);
    text("Press Up_Arrow Key to Feed Harry Milk",130,20);
  }

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }
  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogImg);
  }
  
  if(foodS === 0) {
    foodS = 20
  } 
  

 drawSprites();

}

function readStock(data){
  foodS = data.val();
}
  
function writeStock(x){
    if(x <= 0){
      x = 0;
    }
    else{
      x = x-1;
    }
      database.ref("/").update({
        Food : x,
      })
    }
