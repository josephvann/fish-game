class Fish {
    constructor() {
        this.dead = false;
        this.visible = true;
        this.decay = 100;
        this.sizeFactor = 1.5;
        this.maxSizeFactor = random(4,8)/1;
        this.nosePos = {x: 0, y: 0};
        this.baseHeadWidth = 10
        this.headWidth = this.baseHeadWidth*this.sizeFactor;
        this.baseHeadHeight = 13;
        this.headHeight = this.baseHeadHeight*this.sizeFactor;
        this.baseFinLength = 5;
        this.finLength = this.baseFinLength*this.sizeFactor;
        this.baseFinWidth = 3;
        this.finWidth = this.baseFinWidth*this.sizeFactor;
        this.baseBodyLength = 20;
        this.bodyLength = this.baseBodyLength*this.sizeFactor;
        this.baseTailWidth = 8;
        this.tailWidth = this.baseTailWidth*this.sizeFactor;
        this.baseTailLength = 10;
        this.tailLength = this.baseTailLength*this.sizeFactor;
        this.position = {x: 500, y: 500};
        this.angle = random(0,628)/100;
        this.deltaPos = {x: 0, y: -1};
        this.baseSpeed = random(15,25)/16;
        this.speed = this.baseSpeed
        this.hue = random(0,100);
        this.starvationThreshold = random(1500, 3000);
        this.timeSinceFood = 0;
        this.canStarve = true;
        this.index = 0;
        this.midUTurn = false;
        this.uTurnDuration = 30;
        this.scavengeSpeedFactor = random(100, 115)/100;
        this.uTurnProgress = 0;
        this.finTempo = 8;
        this.foodEaten = 0;
        this.nearestFoodDist = 300;
        this.scavenging = false;
        this.black = true;
        this.noseOffset = 0;
    }

    draw() {
        if(this.visible) {
            this.finOffset = sin((frames * this.speed) / this.finTempo)*(this.finWidth/2);
            this.tailOffset = cos((frames * this.speed) / this.finTempo)*(this.headWidth/5);

            push();

            translate(this.position.x, this.position.y);
            rotate(this.angle);

            // head
            if(this.black) {
                fill(66, 0, 40, this.decay);
            } else {
                fill(this.hue,50,50, this.decay);
            }
            beginShape();
            vertex(this.nosePos.x+this.noseOffset, this.nosePos.y);
            vertex(this.nosePos.x-this.headWidth/2, this.nosePos.y+this.headHeight);
            vertex(this.nosePos.x+this.headWidth/2, this.nosePos.y+this.headHeight);
            endShape(CLOSE);

            // fins
            // left
            /* beginShape();
            vertex(this.nosePos.x-this.headWidth/2, this.nosePos.y+this.headHeight);
            vertex(this.nosePos.x-(this.finWidth+this.headWidth/2), this.nosePos.y+this.headHeight+this.finLength);
            vertex(this.nosePos.x-this.headWidth/2, this.nosePos.y+this.headHeight+this.finLength);
            endShape(CLOSE);
            // right
            beginShape();
            vertex(this.nosePos.x+this.headWidth/2, this.nosePos.y+this.headHeight);
            vertex(this.nosePos.x+(this.finWidth+this.headWidth/2), this.nosePos.y+this.headHeight+this.finLength);
            vertex(this.nosePos.x+this.headWidth/2, this.nosePos.y+this.headHeight+this.finLength);
            endShape(CLOSE);

            // body
            beginShape();
            vertex(this.nosePos.x-this.headWidth/2, this.nosePos.y+this.headHeight);
            vertex(this.nosePos.x+this.headWidth/2, this.nosePos.y+this.headHeight);
            vertex(this.nosePos.x+this.tailOffset, this.nosePos.y+this.headHeight+this.bodyLength);
            endShape(CLOSE);

            // tail
            // first half
            beginShape();
            vertex(this.nosePos.x+this.tailOffset, this.nosePos.y+this.headHeight+this.bodyLength);
            vertex(this.nosePos.x-this.tailWidth/2+this.finOffset, this.nosePos.y+this.headHeight+this.bodyLength+(this.tailLength*1.2));
            vertex(this.nosePos.x-this.tailWidth/6+this.finOffset, this.nosePos.y+this.headHeight+this.bodyLength+this.tailLength);
            endShape(CLOSE);

            // first half
            vertex(this.nosePos.x+this.tailOffset, this.nosePos.y+this.headHeight+this.bodyLength);
            vertex(this.nosePos.x+this.tailWidth/2+this.finOffset, this.nosePos.y+this.headHeight+this.bodyLength+(this.tailLength*1.2));
            vertex(this.nosePos.x+this.tailWidth/6+this.finOffset, this.nosePos.y+this.headHeight+this.bodyLength+this.tailLength);
            endShape(CLOSE); */

            pop();
            
            fill(0,100,50);

            var clipDirection = p5.Vector.fromAngle(this.angle + PI/2);
            clipDirection.setMag(8*this.sizeFactor);
            var clipPoint = { x: this.position.x + clipDirection.x, y: this.position.y + clipDirection.y};

            ellipse(clipPoint.x, clipPoint.y, 6*this.sizeFactor);

            clipDirection = p5.Vector.fromAngle(this.angle + PI/2);
            clipDirection.setMag(3*this.sizeFactor);
            clipPoint = { x: this.position.x + clipDirection.x, y: this.position.y + clipDirection.y};

            ellipse(clipPoint.x, clipPoint.y, 2*this.sizeFactor);

        }
    }

    update() {
        this.speed += 0.00001;
        // find deltapos from angle and speed
        if(!this.dead) {
            this.deltaPos.x = this.speed * sin(this.angle);
            this.deltaPos.y = -this.speed * cos(this.angle);

            // apply forces
            this.position.x += this.deltaPos.x;
            this.position.y += this.deltaPos.y;
        } else {
            this.scavenging = false;
        }
        if(this.angle > TWO_PI) {
            this.angle -= TWO_PI;
        } 
        if(this.angle < -TWO_PI) {
            this.angle += TWO_PI;
        } 

        if(!this.scavenging && !this.dead) {
            this.angle += random(-1,1)/50;
            this.speed = this.baseSpeed;
        } else {
            this.speed = this.baseSpeed * this.scavengeSpeedFactor;
        }
        if(this.speed < 0) {
            this.speed = 0;
        }

        if(this.position.x < -50 ) {
            this.angle -= PI; 
            this.position.x = -50;
        } 
        if(this.position.x > window.innerWidth + 50) {
            this.angle -= PI; 
            this.position.x = window.innerWidth + 50;
        }
        if(this.position.y < -50 ) {
            this.angle -= PI; 
            this.position.y = -50;
        } 
        if(this.position.y > window.innerHeight + 50) {
            this.angle -= PI; 
            this.position.y = window.innerHeight + 50;
        }
        if(this.dead) {
            this.decay--;
            this.changeScale(0.98);
            if(this.decay <= 0) {
                this.visible = false;
            }
        }
        if(this.canStarve && this.timeSinceFood > this.starvationThreshold) {
            this.dead = true;
        }
        this.timeSinceFood ++;
    }

    changeScale(factor) {
        if(this.sizeFactor < this.maxSizeFactor){
            this.sizeFactor *= factor;
            this.headWidth = this.baseHeadWidth*this.sizeFactor;
            this.headHeight = this.baseHeadHeight*this.sizeFactor;
            this.finLength = this.baseFinLength*this.sizeFactor;
            this.finWidth = this.baseFinWidth*this.sizeFactor;
            this.bodyLength = this.baseBodyLength*this.sizeFactor;
            this.tailWidth = this.baseTailWidth*this.sizeFactor;
            this.tailLength = this.baseTailLength*this.sizeFactor;        
            this.baseSpeed *= factor;
        }
    }
}