var fish = [];
var food = [];
var bubbles = [];
var bullets = [];
var bgCircles = [];
var maxFood = 20;
var foodHeldInterval = 240;
var frames = 0;
var livingFish = 0;
var fpsAverage = 0;
var foodEaten = 0;
var foodInterval = 20;
var racistFish = false;
var colorTolerance = 5;
var score = 0;  
var level = 1;
var attractionRadius = 200;
var repulsionRadius = 2;
var paused = false;
var fishCount;
var headingColor;
var white;
var black;
var visibleFish;
var fishSpawnInterval = 20;
var fishKilled = 0;
var boostRefillInterval = 12;
var labelFontSize = 12;
var hudMargin = 10;
var bubbleInterval = 7;
var scattering = false;
var schoolDuration = 1500;
var bgRotation = 0;
var triple = false;
var shotgun = false;
var octogun = false;
var level = 0;

var isLeft = false;
var isRight = false;
var isDown = false;
var isBoost = false;
var isShoot = false;
var isBomb = false;
var isPoison = false;

function setup() {
   
    createCanvas(window.innerWidth, window.innerHeight);
    colorMode(HSL, 100);
    frameRate(40);
    background(40, 40, 30);
    noStroke();
    createBG();
    headingColor = color(66, 30, 80);
    white = color(0, 0, 100);
    black = color(0, 0, 0);
    smooth(2);
    var pixelCount = window.innerHeight * window.innerWidth;
    var fishDensity = 0.1; // per 10,000 pixels
    var foodDensity = 0.0005;

    var maxFood = int((pixelCount/10000) * foodDensity);
    fishCount = int((pixelCount/10000) * fishDensity) * random(90,110)/100; 

    player1 = new Player();

    if(bubbles.length > 500) {
        bubbles.splice(0,1);
    }

    for(i = 0; i < fishCount; i++) {
        var newFish = new Fish();
            
            var newX = random(0, window.innerWidth);
            var newY = random(0, window.innerHeight);
            while(dist(newX, newY, player1.position.x, player1.position.y) < 500)  {
                newX = random(0, window.innerWidth);
                newY = random(0, window.innerHeight);
            }            
            newFish.position = {x: newX, y: newY};
            newFish.index = i;

            fish.push(newFish);
    }

    for(i = 0; i < maxFood; i++) {
        food.push(new Food(i));
    }

}



function draw() {
    noStroke();
    if(!paused) {
        background(65, 40, 10);

        drawBG();

        if(player1.dead) {
            player1.draw();
        }

        if(level > 1) {
            triple = true;
        }
        if(level > 2) {
            triple = false;
            shotgun = true;
        }
        if(level > 3) {
            shotgun = false;
            octogun = true;
        }

        if(visibleFish < fishCount && frames % fishSpawnInterval == 0) {
            var newFish = new Fish();
            var newX = random(0, window.innerWidth);
            var newY = random(0, window.innerHeight);
            while(dist(newX, newY, player1.position.x, player1.position.y) < 300)  {
                newX = random(0, window.innerWidth);
                newY = random(0, window.innerHeight);
            }            
            newFish.position = {x: newX, y: newY};
            newFish.index = fish.length-1;
            newFish.sizeFactor = 1.5;
            fish.push(newFish);
        }

        checkNeighbours(fish);

        for(i = 0; i < bubbles.length; i++) {
            bubbles[i].draw();
            bubbles[i].update();
        }

        for(i = 0; i < food.length; i++) {
            food[i].draw();
            food[i].update();    
        }
        
        for(i = 0; i < bullets.length; i++) {
            bullets[i].draw();
            bullets[i].update();
            if(bullets[i].lifespan < 0) {
                bullets.splice(i, 1);
            }
        }

        for(i = 0; i < fish.length; i++) {
            fish[i].draw();
            fish[i].update();
        }


        scavenge(fish,food,bullets);        

        

        player1.update();
        if(!player1.dead) {
            player1.draw();
        }

        if(food.length < maxFood && frames % foodInterval == 0) {
            food.push(new Food(i));
        }

        frames++;

        if(player1.dead) {
            drawDeadScreen();
        } else {
            score++;
        }
        drawHUD();

        if(random() > 0.995) {
            scattering = false;
        }

        if(frames % schoolDuration == 0 && !scattering) {
            scattering = true;
            console.log(scattering);
            var startScatterFrames = frames;
        } 
        

    }
}








function resetGame() {
    bubbles = [];
    bullets = [];
    level = 0;
    player1.maxBullets = 30;
    player1.bullets = player1.maxBullets;
    player1.dead = false;
    player1.visible = true;
    player1.biteCount = 0;
    player1.position = {x: window.innerWidth/2, y: window.innerHeight/2};
    player1.sizeFactor = 1; 
    player1.boost = player1.maxBoost;
    player1.foodHeld = player1.maxFoodHeld;
    player1.angle = 0;
    player1.bombsHeld = player1.maxBombsHeld;
    player1.boostPower = 1.013;
    food = [];
    fish = [];
    for(i = 0; i < fishCount; i++) {
        var newFish = new Fish();
              
        var newX = random(0, window.innerWidth);
        var newY = random(0, window.innerHeight);
        while(dist(newX, newY, player1.position.x, player1.position.y) < 500)  {
            newX = random(0, window.innerWidth);
            newY = random(0, window.innerHeight);
        }            
        newFish.position = {x: newX, y: newY};
        newFish.index = i;

        fish.push(newFish);
        fish[i].position = {x: newX, y: newY};
        fish[i].sizeFactor = 1.5;
    }
    foodEaten = 0;
    fishKilled = 0;
    frames = 0;
    score = 0;
}
function keyPressed() {
    keyHandler(key, true);
}
   
function keyReleased() {
    keyHandler(key, false);
}

function keyHandler(k, b) {
    switch (k) {
        case 'a':
          return isLeft = b;
        case 's':
          return isDown = b;
        case 'd':
          return isRight = b;       
        case 'w':
          return isBoost = b;
        case 'q':
          if(b) {
            return player1.dropFood();
          } else {
              return false;
          }
        case 'e':
          if(b) {
            return player1.dropBomb();
          } else {
              return false;
          }
        case ' ':
          return isShoot = b;
        case 'p':
          if(b) {
            return paused = !paused;
          } else {
            return false;
          }
        case 'r':
          if(b && player1.dead || b && paused ) {
            resetGame();
            paused = false;
          }

        default:
          return b;
        }
}








