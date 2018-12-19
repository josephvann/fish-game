function addBubble(x, y) {
    bubbles.push(new Bubble(x, y));
    bubbles[bubbles.length-1].index = bubbles.length-1;
}

function createBG() {
    for(j = -1; j < 2; j++) {
        for(i = 0; i < 3; i ++) {
            var circleColor = color(sin(frames/16 + i/2)*2+64, 40, 20, 4);
            var position = {x: window.innerWidth/2 + (j * window.innerWidth/3), y: window.innerHeight/2};
            var radius = abs(sin(frames/512 + i/2)*window.innerWidth/2)+window.innerHeight/6;
            bgCircles.push(new BGCircle(position.x, position.y, radius, circleColor, i));
        }
    }
    for(j = 1; j < 3; j++) {
        for(i = 0; i < 3; i ++) {
            var circleColor = color(sin(frames/16 + i/2)*2+64, 40, 20, 4);
            var position = {x: window.innerWidth/3 * j+2, y: 0}
            var radius = abs(sin(frames/512 + i/2)*window.innerWidth/2)+window.innerHeight/6
            bgCircles.push(new BGCircle(position.x, position.y, radius, circleColor, i));
        }
    }
    for(j = 1; j < 3; j++) {
        for(i = 0; i < 3; i ++) {
            var circleColor = color(sin(frames/16 + i/2)*2+64, 40, 20, 4);
            var position = {x: window.innerWidth/3 * j+2, y: window.innerHeight}
            var radius = abs(sin(frames/512 + i/2)*window.innerWidth/2)+window.innerHeight/6
            bgCircles.push(new BGCircle(position.x, position.y, radius, circleColor, i));
        }
    }
}

function drawBG() {
    for(i = 0; i < bgCircles.length; i++) {
        bgCircles[i].update();
        bgCircles[i].draw();
    }
}

function drawHUD() {
    drawScore();
    drawFishCount();
    drawFoodEaten();
    drawFrameRate();
    drawFishKilled();
    drawWeapons();
    drawBoostGauge();
    drawProgress();
}
function drawWeapons() {
    noStroke();
    textSize(labelFontSize);
    textAlign(CENTER, BOTTOM);
    fill(headingColor);
    text("Poison", window.innerWidth/3, 20);
    textSize(32);
    fill(white);
    text(player1.foodHeld, window.innerWidth/3, 48);    

    noStroke();
    textSize(labelFontSize);
    textAlign(CENTER, BOTTOM);
    fill(headingColor);
    text("Bullets", window.innerWidth/2, 20);
    textSize(32);
    fill(white);
    text(player1.bullets, window.innerWidth/2, 48);   

    noStroke();
    textSize(labelFontSize);
    textAlign(CENTER, BOTTOM);
    fill(headingColor);
    text("Bombs", window.innerWidth*2/3, 20);
    textSize(32);
    fill(white);
    text(player1.bombsHeld, window.innerWidth*2/3, 48);    
}
function drawFishKilled() {
    noStroke();
    textSize(labelFontSize);
    textAlign(CENTER, BOTTOM);
    fill(headingColor);
    text("Kills", window.innerWidth/3, window.innerHeight - 38);
    textSize(32);
    fill(white);
    text(fishKilled, window.innerWidth/3, window.innerHeight-10);    
}

function drawScore() {
    noStroke();
    textSize(12);
    textAlign(LEFT, BOTTOM);
    textFont("Black Han Sans");
    fill(headingColor);
    text("Score", 30, window.innerHeight - 38);
    textSize(32);
    fill(white);
    text(score, 30, window.innerHeight-10);
}
function drawFoodEaten() {
    noStroke();
    textSize(12);
    textAlign(CENTER, BOTTOM);
    fill(headingColor);
    text("Food", window.innerWidth*(2/3), window.innerHeight - 38);
    textSize(32);
    fill(white);
    text(foodEaten, window.innerWidth*(2/3), window.innerHeight-10);    
}
function drawProgress() {
    noStroke();
    textSize(12);
    textAlign(CENTER, BOTTOM);
    fill(headingColor);
    text("Level", window.innerWidth/2, window.innerHeight - 38);
    textSize(32);
    fill(white);
    var displayProgress = int(level*1000)/1000;
    text(displayProgress, window.innerWidth/2, window.innerHeight-10);    
}
function drawDeadScreen() {
    textAlign(CENTER, BOTTOM);
    textSize(100);
    noFill();
    stroke(100,100,100);
    strokeWeight(5);
    textFont("Black Han Sans");
    text("you are dead", window.innerWidth/2, window.innerHeight/2.5);
    textSize(75);
    text("r to respawn", window.innerWidth/2, window.innerHeight/2.5 + 120);
}

function drawBoostGauge() {
    noStroke();
    var position = createVector(hudMargin, 20);
    var width = 100;
    var height = 10;
    var filled = player1.boost/player1.maxBoost;
    push();
    translate(position);
    fill(black);
    rect(0,5, width, height);
    fill(headingColor);
    textSize(labelFontSize);
    textAlign(LEFT);
    text("Boost", 0,0);
    fill(white);
    rect(0,5, width*filled, height);
    pop();
}

function drawFrameRate() {
    noStroke();
    fill(0,0,100);
    textSize(20);
    textAlign(RIGHT, BOTTOM);
    textFont("Black Han Sans");
    fpsAverage = (fpsAverage + frameRate())/2;
    fpsText = int(fpsAverage);
    text(fpsText + ' fps',window.innerWidth-20,32);
    textSize(16);
}
function drawFishCount() {
    noStroke();
    textSize(12);
    textAlign(RIGHT, BOTTOM);
    fill(headingColor);
    text("Fish", window.innerWidth - 30, window.innerHeight - 38);
    textSize(32);
    fill(white);
    text(visibleFish,window.innerWidth - 30, window.innerHeight - 10);
}